import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const html = await readFile(new URL('index.html',root),'utf8');
const projects = JSON.parse(await readFile(new URL('projects.json',root),'utf8'));
assert.equal(new Set(projects.map(p=>p.id)).size,projects.length,'Unique project IDs');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'One H1');
assert(!html.includes('{{')&&!html.includes('FEATURED_PROJECTS'),'No unfilled build slots');
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));
for(const [,anchor] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.has(anchor),`Anchor exists: ${anchor}`);
for(const [,asset] of html.matchAll(/(?:src|href)="(assets\/[^"#]+|styles\.css|script\.js)"/g)) await access(new URL(asset,root));
for(const p of projects){assert(p.description.length>40,`Description: ${p.id}`);assert(p.source,`Source: ${p.id}`);assert.equal(new URL(p.url).protocol,'https:',`HTTPS project link: ${p.id}`);}
const pdf=await readFile(new URL('assets/Muhammad-Kamran-CV.pdf',root));
assert.equal(pdf.subarray(0,5).toString(),'%PDF-');
assert(html.includes('href="/examflow-video-guide/"'),'Preserved guide link');
assert(!html.includes(':8443')&&!html.includes('staging.')&&!html.includes('server_password'),'No admin links or credentials');
console.log(`PASS: ${projects.length} projects, local assets, CV PDF, anchors, metadata slots and protected guide link.`);
