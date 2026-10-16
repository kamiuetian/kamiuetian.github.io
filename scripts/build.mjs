import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const projects = JSON.parse(await readFile(new URL('projects.json', root), 'utf8'));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow = '<span aria-hidden="true">↗</span>';
const link = p => `<a class="text-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.linkLabel)}: ${esc(p.title)}">${esc(p.linkLabel)} ${arrow}</a>`;
const featured = projects.filter(p => p.image).map((p,i) => `
  <article class="project" data-category="${p.category}" data-project="${p.id}"${i >= 4 ? ' data-extra' : ''}>
    <a class="project-image" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(p.title)} — ${esc(p.linkLabel.toLowerCase())}">
      <img src="assets/${p.image}.webp" width="1400" height="876" loading="lazy" decoding="async" alt="${esc(p.title)} website screenshot presented in an editorial browser mockup">
      <span class="image-arrow" aria-hidden="true">↗</span>
    </a>
    <div class="project-heading"><h3>${esc(p.title)}</h3><span>${String(i+1).padStart(2,'0')}</span></div>
    <p class="project-category">${esc(p.label)}</p>
    <p class="project-description">${esc(p.description)}</p>
    <p class="project-stack">${esc(p.stack)}</p>
    ${link(p)}
  </article>`).join('\n');
const archive = projects.filter(p => !p.image).map(p => `
  <article class="archive-item" data-category="${p.category}" data-project="${p.id}" data-extra>
    <div><p class="project-category">${esc(p.label)}</p><h3>${esc(p.title)}</h3></div>
    <p>${esc(p.description)}</p>
    ${link(p)}
  </article>`).join('\n');
let html = await readFile(new URL('index.template.html',root),'utf8');
html = html.replace('<!-- FEATURED_PROJECTS -->',featured).replace('<!-- ARCHIVE_PROJECTS -->',archive).replaceAll('{{PROJECT_COUNT}}',String(projects.length));
html = html.replace(/[ \t]+$/gm, '');
await writeFile(new URL('index.html',root),html);
console.log(`Built CV with ${projects.length} projects and ${projects.filter(p=>p.image).length} screenshot thumbnails.`);
