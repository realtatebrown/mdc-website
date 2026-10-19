import assert from 'node:assert/strict';
import test from 'node:test';
const {default:worker}=await import('../dist/server/index.js');
for(const route of ['/','/partners','/playbook','/data','/news','/principles']){
 test(`production Worker renders ${route}`,async()=>{
  const response=await worker.fetch(new Request(`https://tate-brown-website.tateinho.chatgpt.site${route}`,{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
  assert.equal(response.status,200);
  assert.match(response.headers.get('content-type')||'',/text\/html/);
  const html=await response.text();
  assert.match(html,/<h1\b/);
  assert.match(html,/id="main-content"/);
  assert.ok(!html.includes('Internal Server Error'));
 });
}

test('research deep links select Strong Borders without a blocked iframe',async()=>{
 const response=await worker.fetch(new Request('https://tate-brown-website.tateinho.chatgpt.site/data?tool=287g',{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
 assert.equal(response.status,200);
 const html=await response.text();
 assert.match(html,/id="research-tool-title">Texas 287\(g\) Tracker/);
 assert.match(html,/href="https:\/\/287g\.strongborders\.org\/"/);
 assert.ok(!html.includes('<iframe'),'The restricted tracker must use an honest linked preview');
 assert.match(html,/href="\/data\?tool=migration"/);
 assert.match(html,/aria-current="true"/);
});

test('partner feed links render the selected contributor before hydration',async()=>{
 const response=await worker.fetch(new Request('https://example.com/news?partner=Jason%20Killmeyer&format=articles',{headers:{accept:'text/html'}}),{ASSETS:{fetch:async()=>new Response('Not found',{status:404})}},{waitUntil(){},passThroughOnException(){}});
 assert.equal(response.status,200);const html=await response.text();
 assert.match(html,/id="partner-library-title">Jason Killmeyer/);
 assert.ok(!html.includes('class="partner-news-feature"'));
 assert.match(html,/How to Solve the ICE Manpower Problem/);
 assert.ok(!html.includes('class="coalition-news-secondary"'));
 assert.match(html,/media-portrait/);
});
