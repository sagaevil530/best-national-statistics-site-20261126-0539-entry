// Small SVG chart builders, written for this site. Every chart is plain SVG
// built from the numbers in data.js — no chart library, no canvas, nothing
// fetched. Each builder returns an SVG string; views drop it into the page.
function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function niceTicks(min, max, count = 4) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const rounded = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const nice = rounded * mag;
  const start = Math.floor(min / nice) * nice;
  const ticks = [];
  for (let v = start; v <= max + nice * 0.001; v += nice) ticks.push(Math.round(v * 100) / 100);
  return ticks;
}

// A line chart with labelled axes, gridlines and a dot on every point.
export function lineChart(series, { width = 640, height = 300, unit = '', color = '#0f4c5c', label = '' } = {}) {
  const padL = 52, padR = 16, padT = 18, padB = 34;
  const values = series.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min - (max - min) * 0.15;
  const hi = max + (max - min) * 0.15;
  const ticks = niceTicks(lo, hi);
  const x = (i) => padL + (i * (width - padL - padR)) / (series.length - 1);
  const y = (v) => padT + ((hi - v) * (height - padT - padB)) / (hi - lo);
  const points = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const grid = ticks.map((t) => {
    if (t < lo || t > hi) return '';
    return `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="#e3e0d8" stroke-width="1"/>` +
      `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5b6360">${esc(t)}${unit}</text>`;
  }).join('');
  const labels = series.map((p, i) => (i % 2 === 0 || i === series.length - 1)
    ? `<text x="${x(i)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#5b6360">${esc(p.year)}</text>` : '').join('');
  const dots = series.map((p, i) =>
    `<circle cx="${x(i)}" cy="${y(p.value)}" r="3.5" fill="${color}"><title>${esc(p.year)}: ${esc(p.value)}${unit}</title></circle>`).join('');
  const last = series[series.length - 1];
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label || 'Line chart')}">
  ${grid}
  <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  ${dots}
  ${labels}
  <text x="${x(series.length - 1) + 4}" y="${y(last.value) - 8}" text-anchor="end" font-size="12" font-weight="700" fill="${color}">${esc(last.value)}${unit}</text>
</svg>`;
}

// A vertical bar chart with a value on top of every bar.
export function barChart(items, { width = 640, height = 300, color = '#c98a2b', label = '' } = {}) {
  const padL = 52, padR = 12, padT = 22, padB = 34;
  const max = Math.max(...items.map((d) => d.value));
  const ticks = niceTicks(0, max);
  const slot = (width - padL - padR) / items.length;
  const barW = Math.min(48, slot * 0.62);
  const y = (v) => padT + ((max - v) * (height - padT - padB)) / max;
  const grid = ticks.map((t) =>
    `<line x1="${padL}" y1="${y(t)}" x2="${width - padR}" y2="${y(t)}" stroke="#e3e0d8" stroke-width="1"/>` +
    `<text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#5b6360">${esc(t)}</text>`).join('');
  const bars = items.map((d, i) => {
    const cx = padL + slot * i + slot / 2;
    return `<rect x="${(cx - barW / 2).toFixed(1)}" y="${y(d.value).toFixed(1)}" width="${barW}" height="${(height - padB - y(d.value)).toFixed(1)}" rx="3" fill="${d.color || color}"><title>${esc(d.label)}: ${esc(d.value)}</title></rect>` +
      `<text x="${cx}" y="${y(d.value) - 6}" text-anchor="middle" font-size="11" font-weight="700" fill="#333d3a">${esc(d.value)}</text>` +
      `<text x="${cx}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#5b6360">${esc(d.label)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(label || 'Bar chart')}">${grid}${bars}</svg>`;
}

// A donut chart with a legend list beside it.
export function donutChart(items, { size = 260, colors = ['#0f4c5c', '#c98a2b', '#e76f51', '#2a9d8f', '#7d8c8a'], label = '' } = {}) {
  const total = items.reduce((s, d) => s + d.share, 0);
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r * 0.62;
  let angle = -90;
  const slices = items.map((d, i) => {
    const start = angle;
    const sweep = (d.share / total) * 360;
    angle += sweep;
    const end = angle;
    const large = sweep > 180 ? 1 : 0;
    const a0 = (start * Math.PI) / 180, a1 = (end * Math.PI) / 180;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const ix0 = cx + inner * Math.cos(a0), iy0 = cy + inner * Math.sin(a0);
    const ix1 = cx + inner * Math.cos(a1), iy1 = cy + inner * Math.sin(a1);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${ix1.toFixed(1)} ${iy1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${ix0.toFixed(1)} ${iy0.toFixed(1)} Z" fill="${colors[i % colors.length]}"><title>${esc(d.sector || d.label)}: ${esc(d.share)}%</title></path>`;
  }).join('');
  const legend = items.map((d, i) =>
    `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${esc(d.sector || d.label)} <strong>${esc(d.share)}%</strong></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(label || 'Donut chart')}">${slices}
  <text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="#1d2b28">100%</text>
  <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#5b6360">of GDP</text></svg>
  <ul class="legend">${legend}</ul></div>`;
}

// An age pyramid: men to the left, women to the right, in thousands.
export function pyramid(groups, { width = 640, height = 320 } = {}) {
  const padT = 8, padB = 30, padC = 8;
  const max = Math.max(...groups.flatMap((g) => [g.male, g.female]));
  const half = (width - padC) / 2;
  const rowH = (height - padT - padB) / groups.length;
  const barH = rowH * 0.72;
  const rows = groups.map((g, i) => {
    const y = padT + i * rowH + (rowH - barH) / 2;
    const mw = (g.male / max) * half;
    const fw = (g.female / max) * half;
    return `<rect x="${(half - mw).toFixed(1)}" y="${y.toFixed(1)}" width="${mw.toFixed(1)}" height="${barH.toFixed(1)}" rx="2" fill="#0f4c5c"><title>Men ${g.group}: ${g.male} thousand</title></rect>` +
      `<rect x="${(half + padC).toFixed(1)}" y="${y.toFixed(1)}" width="${fw.toFixed(1)}" height="${barH.toFixed(1)}" rx="2" fill="#c98a2b"><title>Women ${g.group}: ${g.female} thousand</title></rect>` +
      `<rect x="${(width / 2 - 26).toFixed(1)}" y="${(y + barH / 2 - 9).toFixed(1)}" width="52" height="18" rx="9" fill="#fffdf8"/>` +
      `<text x="${width / 2}" y="${(y + barH / 2 + 4).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#1d2b28">${esc(g.group)}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Age pyramid, 2025">${rows}
  <text x="${half / 2}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#5b6360">Men</text>
  <text x="${width - half / 2}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#5b6360">Women</text></svg>
  <p class="chart-note">Thousands of people by age group, 2025. Source: ANSO Population Register.</p>`;
}
