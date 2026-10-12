import snapshot from './snapshot.json';
import {parseContent,type Content} from './model';
const fallback=parseContent(snapshot);
let lastGood:Content=fallback;
let nextRefresh=0;
let pending:Promise<Content>|undefined;
// Server-only. The sheet itself is private; the configured publisher exposes Published rows only.
export async function loadContent():Promise<Content>{
 const endpoint=process.env.MDC_CONTENT_FEED_URL;
 if(!endpoint)return fallback;
 if(Date.now()<nextRefresh)return lastGood;
 if(pending)return pending;
 pending=(async()=>{
  try{
   const url=new URL(endpoint);
   if(url.protocol!=='https:'||url.hostname!=='script.google.com'||!/^\/macros\/s\/[^/]+\/exec$/.test(url.pathname))throw Error('Invalid publisher URL');
   const response=await fetch(url,{signal:AbortSignal.timeout(20000),cache:'no-store'});
   if(!response.ok)throw Error('Content publisher unavailable');
   const body=await response.text();if(body.length>2_000_000)throw Error('Content feed too large');
   lastGood=parseContent(JSON.parse(body));
   nextRefresh=Date.now()+300_000;
  }catch{console.warn('MDC content refresh failed; keeping saved content.');nextRefresh=Date.now()+60_000;}
  return lastGood;
 })();
 try{return await pending;}finally{pending=undefined;}
}
