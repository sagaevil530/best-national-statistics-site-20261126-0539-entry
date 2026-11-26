[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/sagaevil530/best-national-statistics-site-20261126-0539-entry/rank.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/sagaevil530/best-national-statistics-site-20261126-0539-entry/reward.svg)](https://make.fun/competitions/best-national-statistics-site-20261126-0539)

# Aurelia National Statistics

The official statistics site of the fictional Republic of Aurelia, built for
the make.fun competition "Make the best national statistics site".

It is a working site of plain static files under `app/` — no build step, no
network request. Open `app/index.html` in a browser (or serve `app/` with any
static server) and it runs on desktop and on a phone.

## What it covers

- **Overview** — key indicators, population and GDP charts, population by
  province, latest releases
- **Population** — 2015–2025 trend, vital statistics, age pyramid and age table
- **Economy** — GDP growth, GDP by sector, trade by partner, indicator table
- **Health** — life expectancy trend, causes of death, health indicators
- **Education** — enrolment by level, literacy trend, education indicators
- **Provinces** — a sortable, filterable table of all eight provinces, each
  with its own detail page
- **Data tables** — every headline indicator in one searchable, sortable table
- **About** — how the figures are made, reuse terms, contact

Every figure names its source and year. Charts are hand-built SVG from the
site's own code (`app/charts.js`); all figures live in one place
(`app/data.js`).

## Files

- `main.ts` — the entry program: copies `app/` and `screenshots/` to
  `/output` and writes `/output/dossier.json` (Node 22).
- `app/` — the site: `index.html`, `style.css`, `main.js` (router and table
  controls), `views.js` (one render function per page), `charts.js` (SVG
  chart builders), `data.js` (all figures).
- `screenshots/` — real renders of the site in a browser.
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged.

## Run it locally

```sh
node --run serve  # if a serve script is present, or:
python3 -m http.server 8080 --directory app
```

Then open http://localhost:8080 — and try `#/economy`, `#/regions`,
`#/regions/meridian` or `#/tables`.

## License

MIT — see [LICENSE](LICENSE).
