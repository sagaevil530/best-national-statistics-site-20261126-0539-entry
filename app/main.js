// The shell of the site: hash routing, the top navigation, and the table
// controls (sorting by column heading, filtering by search box). No network
// calls anywhere — every page renders from the files already loaded.
import {
  viewOverview, viewPopulation, viewEconomy, viewHealth, viewEducation,
  viewRegions, viewTables, viewAbout,
} from './views.js';

const NAV = [
  ['#/', 'Overview'],
  ['#/population', 'Population'],
  ['#/economy', 'Economy'],
  ['#/health', 'Health'],
  ['#/education', 'Education'],
  ['#/regions', 'Provinces'],
  ['#/tables', 'Data tables'],
  ['#/about', 'About'],
];

const app = document.getElementById('app');
const nav = document.getElementById('nav');

nav.innerHTML = NAV.map(([href, label]) => `<a href="${href}" data-nav="${href}">${label}</a>`).join('');

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [page, arg] = parts;
  let html;
  if (!page) html = viewOverview();
  else if (page === 'population') html = viewPopulation();
  else if (page === 'economy') html = viewEconomy();
  else if (page === 'health') html = viewHealth();
  else if (page === 'education') html = viewEducation();
  else if (page === 'regions') html = viewRegions(arg);
  else if (page === 'tables') html = viewTables();
  else if (page === 'about') html = viewAbout();
  else html = `<h1>Page not found</h1><p>That page does not exist on this site. <a href="#/">Back to the overview</a>.</p>`;
  app.innerHTML = html;
  const active = page ? `#/${page}` : '#/';
  nav.querySelectorAll('a').forEach((a) => a.classList.toggle('active', a.dataset.nav === active));
  document.title = `${page ? page[0].toUpperCase() + page.slice(1) : 'Overview'} — Aurelia National Statistics`;
  window.scrollTo(0, 0);
}

// Sorting: click a heading button to sort its table by that column. Numbers
// sort numerically, text alphabetically; a second click reverses the order.
function sortTable(table, col, dir) {
  const rows = [...table.tBodies[0].rows];
  const numeric = rows.every((r) => /^-?[\d,.$%+−]+$/.test(r.cells[col].textContent.trim().replace(/[−]/g, '-')));
  rows.sort((a, b) => {
    const x = a.cells[col].textContent.trim();
    const y = b.cells[col].textContent.trim();
    if (numeric) return (parseFloat(x.replace(/[^0-9.-]/g, '')) - parseFloat(y.replace(/[^0-9.-]/g, ''))) * dir;
    return x.localeCompare(y) * dir;
  });
  table.tBodies[0].append(...rows);
  table.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.dataset.dir = btn.dataset.col === String(col) ? String(-dir) : '1';
    btn.querySelector('span').textContent = btn.dataset.col === String(col) ? (dir === 1 ? '↑' : '↓') : '↕';
  });
}

document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-sort]');
  if (!btn) return;
  const table = document.getElementById(btn.dataset.sort);
  if (table) sortTable(table, Number(btn.dataset.col), Number(btn.dataset.dir));
});

document.addEventListener('input', (event) => {
  const box = event.target.closest('[data-filter]');
  if (!box) return;
  const table = document.getElementById(box.dataset.filter);
  if (!table) return;
  const query = box.value.trim().toLowerCase();
  let shown = 0;
  [...table.tBodies[0].rows].forEach((row) => {
    const match = !query || row.textContent.toLowerCase().includes(query);
    row.style.display = match ? '' : 'none';
    if (match) shown += 1;
  });
  let note = table.parentElement.querySelector('.filter-note');
  if (!note) {
    note = document.createElement('p');
    note.className = 'filter-note';
    table.parentElement.appendChild(note);
  }
  note.textContent = query ? `${shown} of ${table.tBodies[0].rows.length} rows match “${box.value.trim()}”.` : '';
});

window.addEventListener('hashchange', route);
route();
