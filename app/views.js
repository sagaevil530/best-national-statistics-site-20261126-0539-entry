// One render function per page of the site. Each returns the page's HTML;
// main.js drops it into <main> and wires up the controls. Figures come only
// from data.js, and every section names its source and year.
import {
  COUNTRY, KEY_INDICATORS, POPULATION_SERIES, AGE_GROUPS, VITAL_STATS,
  GDP_GROWTH_SERIES, GDP_BY_SECTOR, ECONOMY_INDICATORS, TRADE_PARTNERS,
  HEALTH, EDUCATION, REGIONS, RELEASES, ALL_INDICATORS,
} from './data.js';
import { lineChart, barChart, donutChart, pyramid } from './charts.js';

export function sourceNote(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">${KEY_INDICATORS.map((k) => `
    <article class="kpi">
      <h3>${k.label}</h3>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-change">${k.change}</p>
      <p class="kpi-source">${k.source}</p>
    </article>`).join('')}</div>`;
}

export function viewOverview() {
  const regionBars = REGIONS.map((r) => ({ label: r.name, value: Math.round(r.population) }));
  return `
  <section class="hero">
    <div>
      <p class="eyebrow">Official statistics of the ${COUNTRY.name}</p>
      <h1>Know Aurelia, in numbers.</h1>
      <p class="lede">Population, economy, health and education — published by the
      ${COUNTRY.office} and updated as each release lands.</p>
      <p class="hero-links"><a class="btn" href="#/population">Explore the population</a>
      <a class="btn btn-ghost" href="#/tables">Browse all indicators</a></p>
    </div>
    <div class="hero-flag" aria-label="Flag of Aurelia">
      <svg viewBox="0 0 300 200" role="img" aria-label="Flag of Aurelia: teal field, gold sun, coral band">
        <rect width="300" height="200" fill="#0f4c5c"/>
        <circle cx="150" cy="88" r="42" fill="#e9c46a"/>
        <circle cx="150" cy="88" r="30" fill="#e76f51"/>
        <rect y="168" width="300" height="32" fill="#e76f51"/>
        <rect y="160" width="300" height="8" fill="#e9c46a"/>
      </svg>
      <p>The flag of Aurelia: the sun over the Meridian Sea.</p>
    </div>
  </section>

  <h2>Key indicators</h2>
  ${kpiCards()}

  <div class="two-col">
    <section class="card">
      <h2>Population, 2015–2025</h2>
      ${lineChart(POPULATION_SERIES, { unit: ' m', label: 'Population of Aurelia 2015 to 2025, millions' })}
      ${sourceNote('ANSO Population Register, 2025.')}
    </section>
    <section class="card">
      <h2>Real GDP growth</h2>
      ${lineChart(GDP_GROWTH_SERIES, { unit: '%', color: '#c98a2b', label: 'Real GDP growth 2015 to 2025, percent' })}
      ${sourceNote('ANSO National Accounts, 2025.')}
    </section>
  </div>

  <section class="card">
    <h2>Population by province, 2025</h2>
    ${barChart(regionBars, { label: 'Population by province, thousands' })}
    ${sourceNote('ANSO Population Register, 2025. Figures in thousands.')}
    <p><a href="#/regions">See every province in detail &rarr;</a></p>
  </section>

  <section class="card">
    <h2>Latest releases</h2>
    <ul class="releases">${RELEASES.map((r) => `
      <li><time>${r.date}</time><div><strong>${r.title}</strong><p>${r.detail}</p></div></li>`).join('')}
    </ul>
  </section>`;
}

export function viewPopulation() {
  const total = AGE_GROUPS.reduce((s, g) => s + g.male + g.female, 0);
  return `
  <h1>Population &amp; demographics</h1>
  <p class="lede">Aurelia had <strong>4.82 million</strong> residents on 1 January 2025,
  up 0.8% on 2024. Net migration added 22,800 people; natural increase added 15,400.</p>
  <div class="two-col">
    <section class="card">
      <h2>Population, 2015–2025</h2>
      ${lineChart(POPULATION_SERIES, { unit: ' m', label: 'Population 2015 to 2025' })}
      ${sourceNote('ANSO Population Register, 2025.')}
    </section>
    <section class="card">
      <h2>Vital statistics, 2025</h2>
      <dl class="stats-list">${VITAL_STATS.map((v) => `
        <div><dt>${v.label}</dt><dd><strong>${v.value}</strong> <span>${v.note}</span></dd></div>`).join('')}
      </dl>
      ${sourceNote('ANSO Vital Statistics, 2025.')}
    </section>
  </div>
  <section class="card">
    <h2>Age structure, 2025</h2>
    <p>${total.toLocaleString('en-US')} thousand people in all. The largest group is 25–34;
    17.6% of the population is under 15 and 13.1% is 65 or older.</p>
    ${pyramid(AGE_GROUPS)}
  </section>
  <section class="card">
    <h2>Population by age group, 2025</h2>
    ${sortableTable(['Age group', 'Men (000s)', 'Women (000s)', 'Total (000s)'],
      AGE_GROUPS.map((g) => [g.group, g.male, g.female, g.male + g.female]), 'age-table')}
    ${sourceNote('ANSO Population Register, 2025. Click a column heading to sort.')}
  </section>`;
}

export function viewEconomy() {
  return `
  <h1>Economy</h1>
  <p class="lede">GDP was <strong>$68.4 billion</strong> in 2025, up 3.2% in real terms.
  Services produce 58% of output; exports of $24.1 billion exceeded imports by $1.5 billion.</p>
  <div class="two-col">
    <section class="card">
      <h2>Real GDP growth, 2015–2025</h2>
      ${lineChart(GDP_GROWTH_SERIES, { unit: '%', color: '#c98a2b', label: 'Real GDP growth 2015 to 2025' })}
      ${sourceNote('ANSO National Accounts, 2025. 2020 shows the pandemic fall of 1.9%.')}
    </section>
    <section class="card">
      <h2>GDP by sector, 2025</h2>
      ${donutChart(GDP_BY_SECTOR, { label: 'Share of GDP by sector, 2025' })}
      ${sourceNote('ANSO National Accounts, 2025. Shares of current-price GDP.')}
    </section>
  </div>
  <section class="card">
    <h2>Trade by partner, 2025 ($ bn)</h2>
    ${barChart(TRADE_PARTNERS.map((t) => ({ label: t.partner, value: t.exports, color: '#0f4c5c' })),
      { label: 'Exports by trading partner, billions of dollars' })}
    ${sourceNote('ANSO Trade Statistics, 2025.')}
  </section>
  <section class="card">
    <h2>Key economic indicators</h2>
    ${indicatorTable(ECONOMY_INDICATORS)}
    ${sourceNote('ANSO National Accounts, Labour Force Survey, Consumer Prices and Trade Statistics. Click a column heading to sort; use the search box to filter.')}
  </section>`;
}

export function viewHealth() {
  return `
  <h1>Health</h1>
  <p class="lede">Life expectancy at birth is <strong>78.9 years</strong> — 81.2 for women,
  76.5 for men. Aurelia has 4.8 hospital beds and 3.4 doctors per 1,000 people, and spends 8.2% of GDP on health.</p>
  <div class="two-col">
    <section class="card">
      <h2>Life expectancy, 2015–2025</h2>
      ${lineChart(HEALTH.series, { unit: ' yrs', color: '#2a9d8f', label: 'Life expectancy 2015 to 2025' })}
      ${sourceNote('ANSO Vital Statistics, 2025.')}
    </section>
    <section class="card">
      <h2>Causes of death, 2025</h2>
      ${donutChart(HEALTH.causes.map((c) => ({ sector: c.cause, share: c.share })),
        { colors: ['#0f4c5c', '#c98a2b', '#e76f51', '#2a9d8f', '#7d8c8a', '#d9d2c4'], label: 'Causes of death, 2025' })}
      ${sourceNote('ANSO Vital Statistics, 2025. Shares of all deaths.')}
    </section>
  </div>
  <section class="card">
    <h2>Health indicators</h2>
    ${indicatorTable(HEALTH.indicators)}
    ${sourceNote('ANSO Vital Statistics and Health Survey, 2025.')}
  </section>`;
}

export function viewEducation() {
  return `
  <h1>Education</h1>
  <p class="lede">Adult literacy is <strong>98.2%</strong>. Nearly every child finishes primary school,
  91.5% complete upper secondary, and 58.3% go on to tertiary education.</p>
  <div class="two-col">
    <section class="card">
      <h2>Enrolment by level, 2025</h2>
      ${barChart(EDUCATION.enrolment.map((e) => ({ label: e.level.replace(' ', ' '), value: e.rate })),
        { color: '#2a9d8f', label: 'Enrolment rate by level, percent' })}
      ${sourceNote('ANSO Education Survey, 2025. Net enrolment except tertiary (gross).')}
    </section>
    <section class="card">
      <h2>Adult literacy, 2015–2025</h2>
      ${lineChart(EDUCATION.series, { unit: '%', color: '#e76f51', label: 'Adult literacy 2015 to 2025' })}
      ${sourceNote('ANSO Education Survey, 2025.')}
    </section>
  </div>
  <section class="card">
    <h2>Education indicators</h2>
    ${indicatorTable(EDUCATION.indicators)}
    ${sourceNote('ANSO Education Survey and Public Finance, 2025.')}
  </section>`;
}

export function viewRegions(slug) {
  const region = slug ? REGIONS.find((r) => r.name.toLowerCase().replace(/ /g, '-') === slug) : null;
  if (region) {
    const share = ((region.population / COUNTRY.population) * 100000).toFixed(1);
    return `
    <p class="crumb"><a href="#/regions">&larr; All provinces</a></p>
    <h1>${region.name} Province</h1>
    <p class="lede">Capital: <strong>${region.capital}</strong>. ${region.population.toLocaleString('en-US')} thousand
    people live here — ${share}% of Aurelia — across ${region.area.toLocaleString('en-US')} km².</p>
    <div class="kpi-grid">
      <article class="kpi"><h3>Population</h3><p class="kpi-value">${region.population.toLocaleString('en-US')}k</p><p class="kpi-change">2025</p><p class="kpi-source">ANSO Population Register</p></article>
      <article class="kpi"><h3>Density</h3><p class="kpi-value">${region.density} / km²</p><p class="kpi-change">${region.area.toLocaleString('en-US')} km²</p><p class="kpi-source">ANSO Population Register</p></article>
      <article class="kpi"><h3>GDP per capita</h3><p class="kpi-value">$${region.gdpPerCapita.toLocaleString('en-US')}</p><p class="kpi-change">2025</p><p class="kpi-source">ANSO National Accounts</p></article>
      <article class="kpi"><h3>Unemployment</h3><p class="kpi-value">${region.unemployment}%</p><p class="kpi-change">Q3 2025</p><p class="kpi-source">ANSO Labour Force Survey</p></article>
    </div>
    <section class="card">
      <h2>How ${region.name} compares</h2>
      <p>Its GDP per capita is ${region.gdpPerCapita > 14190 ? 'above' : 'below'} the national $14,190,
      and its unemployment is ${region.unemployment > 4.1 ? 'above' : 'below'} the national 4.1%.
      It ranks ${[...REGIONS].sort((a, b) => b.population - a.population).findIndex((r) => r.name === region.name) + 1}
      of 8 provinces by population.</p>
      ${barChart([...REGIONS].sort((a, b) => b.population - a.population).map((r) => ({
        label: r.name, value: r.population, color: r.name === region.name ? '#e76f51' : '#0f4c5c',
      })), { label: 'Population by province, thousands' })}
      ${sourceNote('ANSO Population Register, 2025.')}
    </section>`;
  }
  return `
  <h1>Provinces of Aurelia</h1>
  <p class="lede">Eight provinces, from Meridian's 1.42 million people to the Far Isles' 210,000.
  Select a province for its detail page, or sort and filter the table below.</p>
  <section class="card">
    <h2>All provinces, 2025</h2>
    <label class="filter">Filter provinces <input type="search" data-filter="regions-table" placeholder="Type a name or capital…" aria-label="Filter provinces"></label>
    ${sortableTable(['Province', 'Capital', 'Population (000s)', 'Area (km²)', 'Density (/km²)', 'GDP per capita ($)', 'Unemployment (%)'],
      REGIONS.map((r) => [r.name, r.capital, r.population, r.area, r.density, r.gdpPerCapita, r.unemployment]),
      'regions-table', (row) => `#/regions/${row[0].toLowerCase().replace(/ /g, '-')}`)}
    ${sourceNote('ANSO Population Register and National Accounts, 2025; unemployment: ANSO Labour Force Survey, Q3 2025. Click a row to open the province.')}
  </section>`;
}

export function viewTables() {
  return `
  <h1>Data tables</h1>
  <p class="lede">Every headline indicator in one place — ${ALL_INDICATORS.length} figures,
  each with its value, year and source. Search to filter, click a heading to sort.</p>
  <section class="card">
    <label class="filter">Search indicators <input type="search" data-filter="all-table" placeholder="Try “unemployment” or “literacy”…" aria-label="Search indicators"></label>
    ${sortableTable(['Indicator', 'Value', 'Year', 'Source'],
      ALL_INDICATORS.map((d) => [d.indicator, d.value, String(d.year), d.source]), 'all-table')}
    ${sourceNote('ANSO National Accounts, Population Register, Vital Statistics, Labour Force Survey, Consumer Prices, Trade Statistics, Health Survey, Education Survey and Public Finance.')}
  </section>`;
}

export function viewAbout() {
  return `
  <h1>About this site</h1>
  <p class="lede">This is the statistics portal of the ${COUNTRY.office} (${COUNTRY.officeShort}),
  the office that collects, checks and publishes Aurelia's official statistics.</p>
  <section class="card">
    <h2>How the figures are made</h2>
    <ul class="plain-list">
      <li><strong>Population:</strong> the Population Register, updated from births, deaths and migration records each January.</li>
      <li><strong>Economy:</strong> the National Accounts, compiled quarterly from business surveys, tax records and customs data.</li>
      <li><strong>Labour:</strong> the Labour Force Survey, 12,000 households interviewed every quarter.</li>
      <li><strong>Prices:</strong> the Consumer Price Index, priced monthly in 42 towns from a basket of 620 goods and services.</li>
      <li><strong>Health &amp; education:</strong> annual administrative returns from hospitals, schools and universities.</li>
    </ul>
    <p>Figures are revised when better data arrives; each release notes what changed and why.
    Nothing on this site is copied from another country's statistics office — Aurelia's figures are its own.</p>
  </section>
  <section class="card">
    <h2>Using the data</h2>
    <p>All figures on this site are free to reuse with a credit to “${COUNTRY.office}”.
    The site works entirely offline: every page, chart and figure is a file of this site, so it loads
    with no network request at all.</p>
  </section>
  <section class="card">
    <h2>Contact</h2>
    <p>${COUNTRY.office}<br>1 Census Square, ${COUNTRY.capital}<br>Open weekdays 09:00–17:00.
    Write to us through the feedback form on any release page.</p>
  </section>
  <p class="source">Aurelia is a fictional country; its statistics are invented for this demonstration site.</p>`;
}

// A table whose headings sort and whose rows can link somewhere. data-sort
// attributes are read by main.js; no inline handlers are used.
export function sortableTable(headings, rows, id, linkFor) {
  const head = headings.map((h, i) =>
    `<th scope="col"><button type="button" data-sort="${id}" data-col="${i}" data-dir="1">${h} <span aria-hidden="true">↕</span></button></th>`).join('');
  const body = rows.map((row) => {
    const cells = row.map((c, i) => (i === 0 && linkFor)
      ? `<td><a href="${linkFor(row)}">${c}</a></td>` : `<td>${c}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');
  return `<div class="table-wrap"><table id="${id}" class="data-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function indicatorTable(rows) {
  return `<label class="filter">Filter indicators <input type="search" data-filter="econ-table" placeholder="Type to filter…" aria-label="Filter indicators"></label>
  ${sortableTable(['Indicator', 'Value', 'Year', 'Source'],
    rows.map((d) => [d.indicator, d.value, String(d.year), d.source]), 'econ-table')}`;
}
