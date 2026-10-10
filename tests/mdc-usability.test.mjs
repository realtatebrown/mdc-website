import assert from 'node:assert/strict';
import test, {after} from 'node:test';
import {access, readFile} from 'node:fs/promises';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';
const vite=await createServer({configFile:false,appType:'custom',root:process.cwd(),esbuild:{jsx:'automatic',jsxImportSource:'react'},server:{middlewareMode:true,hmr:false}});
after(()=>vite.close());
const routes=['/','/partners','/playbook','/data','/news','/principles'];
const pages=new Map();
for(const route of routes){
 const {default:Page}=await vite.ssrLoadModule(`/app${route==='/'?'':route}/page.tsx`);
 pages.set(route,renderToStaticMarkup(React.createElement(Page)));
}
const ids=html=>[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
test('all six pages have a heading and a working keyboard skip destination',()=>{
 for(const [route,html] of pages){
  assert.match(html,/<h1\b/,route);
  assert.match(html,/class="skip-link" href="#main-content"/,route);
  assert.equal(ids(html).filter(id=>id==='main-content').length,1,route);
  assert.equal(new Set(ids(html)).size,ids(html).length,`duplicate IDs on ${route}`);
 }
});
test('all rendered internal navigation and image/file paths resolve',async()=>{
 for(const [route,html] of pages){
  for(const [,href] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
   if(!href.startsWith('/')&&!href.startsWith('#'))continue;
   const url=new URL(href,`https://site.test${route}`);
   if(pages.has(url.pathname)){
    if(url.hash)assert.ok(ids(pages.get(url.pathname)).includes(decodeURIComponent(url.hash.slice(1))),`${route}: ${href}`);
   }else await access(`public${decodeURIComponent(url.pathname)}`);
  }
 }
});
test('member cards leave Mark unlinked and keep the other five profiles',async()=>{
 const {individualProfiles}=await vite.ssrLoadModule('/app/partners/data.ts');
 assert.equal(individualProfiles['Mark Morgan'],undefined);
 assert.equal(Object.keys(individualProfiles).length,5);
 assert.match(pages.get('/partners'),/Former Chief of Staff, U.S. Immigration and Customs Enforcement/);
 assert.match(pages.get('/partners'),/Former U.S. Pardon Attorney/);
});
test('news category defaults have no redundant reset and relevant outlets only',async()=>{
 const {default:Archive,archiveStories,filterCoverage}=await vite.ssrLoadModule('/app/news/news-archive.tsx');
 for(const section of ['all','updates','press']){
  const html=renderToStaticMarkup(React.createElement(Archive,{section}));
  assert.ok(!html.includes('Clear filters'),section);
  if(section==='updates'){
   assert.match(html,/Watch documentary/);
   assert.ok(!html.includes('<option>The Atlantic</option>'));
  }
 }
 assert.equal(filterCoverage('zzzz-no-such-story','','').length,0);
 for(const category of new Set(archiveStories.map(s=>s.category)))assert.ok(filterCoverage('',category,'').every(s=>s.category===category));
});
test('every recommendation has a single target and a share control',()=>{
 const html=pages.get('/playbook');
 for(let n=1;n<=21;n++){
  assert.equal(ids(html).filter(id=>id===`rec-${n}`).length,1);
  assert.ok(html.includes(`aria-label="Copy link to recommendation ${n}"`));
 }
});
