import assert from 'node:assert/strict';
import test, {after} from 'node:test';
import {readFile} from 'node:fs/promises';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createServer} from 'vite';
const vite=await createServer({configFile:false,appType:'custom',root:process.cwd(),esbuild:{jsx:'automatic',jsxImportSource:'react'},server:{middlewareMode:true}});
after(()=>vite.close());
const {filterPartners}=await vite.ssrLoadModule('/app/partners/partner-directory.tsx');
const {states,individuals}=await vite.ssrLoadModule('/app/partners/data.ts');
test('directory filters combine query, state, and partner type',()=>{
 assert.equal(filterPartners(states,individuals,'Heritage','District of Columbia','organizations').count,1);
 assert.equal(filterPartners(states,individuals,'Heritage','Texas','organizations').count,0);
 assert.equal(filterPartners(states,individuals,'mark morgan','','individuals').people[0][0],'Mark Morgan');
 assert.equal(filterPartners(states,individuals,'navy seal','','all').people[0][0],'Erik Prince');
 assert.equal(filterPartners(states,individuals,'zzzzzz','','all').count,0);
 assert.equal(filterPartners(states,individuals,'','','all').count,states.reduce((sum,[,p])=>sum+p.length,0)+individuals.length);
});
test('reader retains every chapter and all 21 recommendation controls',async()=>{
 const {default:Page}=await vite.ssrLoadModule('/app/playbook/page.tsx');
 const html=renderToStaticMarkup(React.createElement(Page));
 const content=JSON.parse(await readFile('app/playbook/content.json','utf8'));
 for(const chapter of content.chapters) assert.ok(html.includes(`id="${chapter.id}"`),chapter.id);
 assert.equal((html.match(/class="recommendation-pagination"/g)||[]).length,21);
 assert.ok(html.includes('href="/assets/mdc-playbook.pdf"'));
 assert.ok(html.includes('aria-current="location"'));
});
test('news includes three verified dated stories and local images',async()=>{
 const {stories,NewsGrid}=await vite.ssrLoadModule('/app/news-story.tsx');
 assert.equal(stories.length,3);
 const html=renderToStaticMarkup(React.createElement(NewsGrid));
 for(const s of stories) { assert.ok(html.includes(s.url)); await readFile(`public${s.image}`); }
});
