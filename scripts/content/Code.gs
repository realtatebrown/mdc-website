// MDC website publisher: only explicitly Published records leave this spreadsheet.
const SHEET_ID = '1INn0Ebw2ftEjp-OrYjCJVSbeu9AMMNtgzNWh1MAZ5vk';
const PARTNER_HEADERS = ['ID','Status','Name','Type','State','City','Website or profile URL','Short bio','Logo or photo URL','Featured'];
const NEWS_HEADERS = ['ID','Status','Headline','Date','Outlet','Author','Type','Summary','Article or video URL','Image URL','Image description','Image credit','Featured'];
function readPublished_(book,name,headers){
 const values=book[name]||[];
 if(!values.length||!headers.every((h,i)=>values[0][i]===h))throw new Error('Missing tab or changed headings: '+name);
 return values.slice(1).filter(r=>r[1]==='Published').map(r=>headers.map((h,i)=>String(r[i]==null?'':r[i]).trim()));
}
function buildContent_(){
 const tabs=['Partners','Coalition Updates','Press Coverage'];
 const ranges=Sheets.Spreadsheets.Values.batchGet(SHEET_ID,{ranges:tabs.map(t=>"'"+t+"'!A:M"),valueRenderOption:'FORMATTED_VALUE'}).valueRanges;
 const book={};tabs.forEach((t,i)=>book[t]=ranges[i].values||[]);
 const partners=readPublished_(book,'Partners',PARTNER_HEADERS).map(r=>({id:r[0],status:'Published',name:r[2],kind:r[3],state:r[4],city:r[5],url:r[6],bio:r[7],image:r[8],featured:r[9]==='Yes'}));
 const news=[];
 [['Coalition Updates','updates'],['Press Coverage','press']].forEach(([tab,section])=>readPublished_(book,tab,NEWS_HEADERS).forEach(r=>news.push({id:r[0],status:'Published',section,title:r[2],date:r[3],publisher:r[4],author:r[5],category:section==='updates'?'Coalition updates':r[6],summary:r[7],url:r[8],image:r[9],alt:r[10],credit:r[11],featured:r[12]==='Yes'})));
 for(const rows of [partners,news]){const ids=new Set();rows.forEach(r=>{if(!r.id||ids.has(r.id))throw new Error('Missing or duplicate ID');ids.add(r.id);});}
 partners.forEach(p=>{if(!p.name||!['Organization','Individual'].includes(p.kind)||(p.kind==='Organization'&&!p.state))throw new Error('Incomplete partner');});
  news.forEach(n=>{if(!n.title||!n.url.startsWith('https://')||n.url.includes(' '))throw new Error('Incomplete news');});
 return JSON.stringify({schemaVersion:1,partners,news});
}
function doGet(){
 const cache=CacheService.getScriptCache(),props=PropertiesService.getScriptProperties();
 let json=cache.get('published');
 if(!json){
  const lock=LockService.getScriptLock();lock.waitLock(20000);
  try{
   json=cache.get('published');
   if(!json){
    try{
     json=buildContent_();const chunks=[];for(let i=0;i<json.length;i+=1800)chunks.push(json.slice(i,i+1800));
     if(chunks.length>200)throw new Error('Content too large');
     const previous=Number(props.getProperty('count')||0),writes={count:String(chunks.length)};
     chunks.forEach((chunk,i)=>writes['content_'+i]=chunk);props.setProperties(writes);
     for(let i=chunks.length;i<previous;i++)props.deleteProperty('content_'+i);
    }catch(error){
     const count=Number(props.getProperty('count')||0);if(!count)throw error;
     json=Array.from({length:count},(_,i)=>props.getProperty('content_'+i)||'').join('');
     console.error('Export failed; serving last successful export.');
    }
    if(json.length<90000)cache.put('published',json,30);
   }
  }finally{lock.releaseLock();}
 }
 return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
