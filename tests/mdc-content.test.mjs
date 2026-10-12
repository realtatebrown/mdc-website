import assert from 'node:assert/strict';
import test,{after} from 'node:test';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {createServer} from 'vite';
const vite=await createServer({configFile:false,appType:'custom',root:process.cwd(),server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const {parseContent,partnerViews,featuredNews}=await vite.ssrLoadModule('/app/content/model.ts');
const seed=JSON.parse(await readFile('app/content/snapshot.json','utf8'));
test('migration preserves 66 members and 39 deduplicated stories',()=>{
 const content=parseContent(seed),views=partnerViews(content);
 assert.equal(content.partners.length,66);assert.equal(content.news.length,39);
 assert.equal(views.locations.reduce((n,p)=>n+p.partners.length,0),60);
 assert.equal(views.individuals.length,6);assert.equal(views.links['Mark Morgan'],'');
 assert.equal(new Set(content.news.map(n=>n.url)).size,39);
});
test('draft and archived content is excluded from every derived view',()=>{
 const copy=structuredClone(seed);copy.partners[0].status='Draft';copy.news[0].status='Archived';
 copy.partners.push({status:'Draft',secret:'private note'});
 const content=parseContent(copy),views=partnerViews(content);
 assert.equal(content.partners.length,65);assert.equal(content.news.length,38);
 assert.ok(!JSON.stringify(views).includes(seed.partners[0].name));
 assert.ok(!JSON.stringify(content).includes('private note'));
});
test('new-state partner is included in directory and map from one record',()=>{
 const copy=structuredClone(seed);copy.partners.push({...copy.partners[0],id:'test-maine',name:'Test Maine partner',state:'Maine'});
 const views=partnerViews(parseContent(copy));assert.ok(views.locations.find(p=>p.state==='ME').partners.includes('Test Maine partner'));
 assert.ok(views.states.find(([s])=>s==='Maine')[1].includes('Test Maine partner'));
});
test('unsafe URLs, duplicate IDs, and malformed published data are rejected',()=>{
 for(const mutate of [c=>c.partners[0].url='javascript:alert(1)',c=>c.news[0].url='',c=>c.news[0].id=c.news[1].id,c=>c.partners[0].state='Unknown',c=>c.news[0].date='yesterday']){
  const copy=structuredClone(seed);mutate(copy);assert.throws(()=>parseContent(copy));
 }
 assert.deepEqual(parseContent({schemaVersion:1,partners:[],news:[]}).partners,[]);
});
test('featured cards prioritize selected entries and separate categories',()=>{
 const content=parseContent(seed),cards=featuredNews(content.news);
 assert.equal(cards.length,3);assert.ok(cards.every(s=>s.featured));
 assert.equal(content.news.filter(s=>s.section==='updates').length,6);
 assert.equal(content.news.filter(s=>s.section==='press').length,33);
});
test('publisher exports only Published rows and explicit website columns',async()=>{
 const code=await readFile('scripts/content/Code.gs','utf8');
 const p=['ID','Status','Name','Type','State','City','Website or profile URL','Short bio','Logo or photo URL','Featured','Internal notes'];
 const n=['ID','Status','Headline','Date','Outlet','Author','Type','Summary','Article or video URL','Image URL','Image description','Image credit','Featured'];
 const tabs={Partners:[p,['published','Published','Public name','Organization','Texas','','','','','No','DO NOT EXPORT'],['draft','Draft','Private name'],['archived','Archived','Archived name']], 'Coalition Updates':[n], 'Press Coverage':[n]};
 const context={Sheets:{Spreadsheets:{Values:{batchGet:()=>({valueRanges:Object.values(tabs).map(values=>({values}))})}}}};
 vm.createContext(context);vm.runInContext(code+';this.exported=buildContent_();',context);
 const result=JSON.parse(context.exported);assert.equal(result.partners.length,1);assert.ok(!context.exported.includes('DO NOT EXPORT'));assert.ok(!context.exported.includes('Private name'));parseContent(result);
});
test('runtime rejects broken refresh and retains its last valid feed',async()=>{
 const originalFetch=globalThis.fetch,old=process.env.MDC_CONTENT_FEED_URL,now=Date.now;
 let clock=1000000;Date.now=()=>clock;
 process.env.MDC_CONTENT_FEED_URL='https://script.google.com/macros/s/test/exec';
 let calls=0;globalThis.fetch=async()=>{calls++;return new Response(JSON.stringify(seed));};
 try{
  const {loadContent}=await vite.ssrLoadModule('/app/content/load.ts');
  const first=await loadContent();await loadContent();assert.equal(calls,1);
  clock+=301000;globalThis.fetch=async()=>new Response('{broken json');
  const retained=await loadContent();assert.equal(retained,first);
 }finally{globalThis.fetch=originalFetch;Date.now=now;if(old===undefined)delete process.env.MDC_CONTENT_FEED_URL;else process.env.MDC_CONTENT_FEED_URL=old;}
});

test('new sheet entries appear in partner cards without predefined IDs',async()=>{
 const {partnerMedia}=await vite.ssrLoadModule('/app/news/partner-media-data.ts');
 const row={...seed.news[0],id:'new-partner-article',date:'2026-10-09',author:'Jason Killmeyer',category:'Opinion & analysis'};
 let content=parseContent({...seed,news:[row]});
 assert.equal(partnerMedia(content.news,['Jason Killmeyer'])[0].format,'articles');
 assert.equal(partnerMedia(content.news,['Another Partner']).length,0);
 for(const [category,format] of [['Articles','articles'],['Documentaries & Specials','films'],['Interviews & Podcasts','interviews']]){
  content=parseContent({...seed,news:[{...row,id:'entirely-new-id',category,author:'New Partner'}]});
  assert.equal(partnerMedia(content.news)[0].format,format);
 }
 assert.equal(partnerMedia(parseContent({...seed,news:[{...row,status:'Draft'}]}).news,['Jason Killmeyer']).length,0);
 const updated={...seed.news.find(n=>n.id==='a-playbook-for-mass-deportations'),author:'Updated author',image:'/assets/updated.jpg'};
 assert.equal(partnerMedia([updated])[0].partner,'Updated author');
 assert.equal(partnerMedia([updated])[0].image,'/assets/updated.jpg');
});
