const projectNodes = [...document.querySelectorAll('[data-project]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const showButton = document.querySelector('#show-projects');
const archive = document.querySelector('#project-archive');
const status = document.querySelector('#project-status');
let filter = 'all';
let expanded = false;

function updateProjects(announce = true) {
  let shown = 0;
  for (const project of projectNodes) {
    const matches = filter === 'all' || project.dataset.category === filter;
    const show = matches && (filter !== 'all' || expanded || !project.hasAttribute('data-extra'));
    project.hidden = !show;
    if (show) shown++;
  }
  archive.hidden = !archive.querySelector('[data-project]:not([hidden])');
  showButton.parentElement.hidden = filter !== 'all';
  showButton.setAttribute('aria-expanded', String(expanded));
  showButton.innerHTML = expanded ? 'Show fewer projects <span aria-hidden="true">↑</span>' : `Show all ${projectNodes.length} projects <span aria-hidden="true">↓</span>`;
  for (const button of filterButtons) button.setAttribute('aria-pressed',String(button.dataset.filter === filter));
  if (announce) status.textContent = `${shown} ${shown === 1 ? 'project' : 'projects'} shown.`;
}

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    expanded = false;
    updateProjects();
  });
}
showButton.addEventListener('click', () => {
  expanded = !expanded;
  updateProjects();
  if (!expanded) document.querySelector('#projects-title').scrollIntoView({block:'start',behavior:'instant'});
});
document.documentElement.classList.add('has-js');
updateProjects(false);
