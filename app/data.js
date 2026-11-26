// All figures for the Republic of Aurelia are published by its National
// Statistics Office (ANSO). Every figure below carries its source and year
// where it is shown; this file is the single place the site's numbers live,
// so a figure is never typed twice in two different places.
export const COUNTRY = {
  name: 'Republic of Aurelia',
  shortName: 'Aurelia',
  capital: 'Port Meridian',
  office: 'Aurelia National Statistics Office',
  officeShort: 'ANSO',
  currency: 'aurel (A₸)',
  population: 4820000,
  populationYear: 2025,
  areaKm2: 68420,
};

export const KEY_INDICATORS = [
  { label: 'Population', value: '4.82 m', change: '+0.8% on 2024', source: 'ANSO Population Register, 2025' },
  { label: 'GDP', value: '$68.4 bn', change: '+3.2% real growth', source: 'ANSO National Accounts, 2025' },
  { label: 'GDP per capita', value: '$14,190', change: '+2.4% on 2024', source: 'ANSO National Accounts, 2025' },
  { label: 'Unemployment', value: '4.1%', change: '−0.3 pts on 2024', source: 'ANSO Labour Force Survey, Q3 2025' },
  { label: 'Inflation (CPI)', value: '2.6%', change: '−0.4 pts on 2024', source: 'ANSO Consumer Prices, Oct 2025' },
  { label: 'Life expectancy', value: '78.9 yrs', change: '+0.4 yrs on 2020', source: 'ANSO Vital Statistics, 2025' },
  { label: 'Literacy (15+)', value: '98.2%', change: '+0.2 pts on 2020', source: 'ANSO Education Survey, 2025' },
  { label: 'Median age', value: '36.4 yrs', change: '+0.3 yrs on 2024', source: 'ANSO Population Register, 2025' },
];

// Population in millions, 2015-2025.
export const POPULATION_SERIES = [
  { year: 2015, value: 4.41 }, { year: 2016, value: 4.45 }, { year: 2017, value: 4.49 },
  { year: 2018, value: 4.53 }, { year: 2019, value: 4.57 }, { year: 2020, value: 4.60 },
  { year: 2021, value: 4.64 }, { year: 2022, value: 4.69 }, { year: 2023, value: 4.74 },
  { year: 2024, value: 4.78 }, { year: 2025, value: 4.82 },
];

// Age structure, thousands of people, 2025.
export const AGE_GROUPS = [
  { group: '0–14', male: 432, female: 414 },
  { group: '15–24', male: 338, female: 327 },
  { group: '25–34', male: 401, female: 395 },
  { group: '35–44', male: 358, female: 356 },
  { group: '45–54', male: 312, female: 318 },
  { group: '55–64', male: 262, female: 274 },
  { group: '65–74', male: 178, female: 206 },
  { group: '75+', male: 106, female: 143 },
];

export const VITAL_STATS = [
  { label: 'Births, 2025', value: '54,300', note: '11.3 per 1,000 people' },
  { label: 'Deaths, 2025', value: '38,900', note: '8.1 per 1,000 people' },
  { label: 'Natural increase', value: '+15,400', note: '3.2 per 1,000 people' },
  { label: 'Net migration, 2025', value: '+22,800', note: '4.7 per 1,000 people' },
  { label: 'Total fertility rate', value: '1.72', note: 'children per woman, 2025' },
  { label: 'Infant mortality', value: '4.6', note: 'per 1,000 live births, 2025' },
];

// Real GDP growth, %, 2015-2025.
export const GDP_GROWTH_SERIES = [
  { year: 2015, value: 2.1 }, { year: 2016, value: 2.6 }, { year: 2017, value: 3.0 },
  { year: 2018, value: 3.4 }, { year: 2019, value: 2.8 }, { year: 2020, value: -1.9 },
  { year: 2021, value: 4.2 }, { year: 2022, value: 3.8 }, { year: 2023, value: 3.0 },
  { year: 2024, value: 2.9 }, { year: 2025, value: 3.2 },
];

export const GDP_BY_SECTOR = [
  { sector: 'Services', share: 58, value: 39.7 },
  { sector: 'Manufacturing', share: 19, value: 13.0 },
  { sector: 'Agriculture & fishing', share: 9, value: 6.2 },
  { sector: 'Construction', share: 8, value: 5.5 },
  { sector: 'Mining & energy', share: 6, value: 4.1 },
];

export const ECONOMY_INDICATORS = [
  { indicator: 'GDP, current prices', value: '$68.4 bn', year: 2025, source: 'ANSO National Accounts' },
  { indicator: 'GDP per capita', value: '$14,190', year: 2025, source: 'ANSO National Accounts' },
  { indicator: 'Real GDP growth', value: '3.2%', year: 2025, source: 'ANSO National Accounts' },
  { indicator: 'Unemployment rate', value: '4.1%', year: 'Q3 2025', source: 'ANSO Labour Force Survey' },
  { indicator: 'Youth unemployment (15–24)', value: '9.8%', year: 'Q3 2025', source: 'ANSO Labour Force Survey' },
  { indicator: 'CPI inflation', value: '2.6%', year: 'Oct 2025', source: 'ANSO Consumer Prices' },
  { indicator: 'Exports of goods & services', value: '$24.1 bn', year: 2025, source: 'ANSO Trade Statistics' },
  { indicator: 'Imports of goods & services', value: '$22.6 bn', year: 2025, source: 'ANSO Trade Statistics' },
  { indicator: 'Trade balance', value: '+$1.5 bn', year: 2025, source: 'ANSO Trade Statistics' },
  { indicator: 'Government debt / GDP', value: '41.8%', year: 2025, source: 'ANSO Public Finance' },
  { indicator: 'Average monthly wage', value: '$1,240', year: 'Q3 2025', source: 'ANSO Labour Force Survey' },
  { indicator: 'Tourist arrivals', value: '2.9 m', year: 2025, source: 'ANSO Tourism Survey' },
];

export const TRADE_PARTNERS = [
  { partner: 'Nordmark', exports: 5.8, imports: 4.9 },
  { partner: 'Caldonia', exports: 4.2, imports: 3.8 },
  { partner: 'Vesper Isles', exports: 3.1, imports: 2.7 },
  { partner: 'Ostara', exports: 2.6, imports: 3.3 },
  { partner: 'Tarnovia', exports: 2.0, imports: 1.9 },
  { partner: 'Other partners', exports: 6.4, imports: 6.0 },
];

export const HEALTH = {
  lifeExpectancy: { total: 78.9, female: 81.2, male: 76.5 },
  bedsPer1000: 4.8,
  doctorsPer1000: 3.4,
  healthSpendGdp: 8.2,
  series: [
    { year: 2015, value: 76.8 }, { year: 2017, value: 77.2 }, { year: 2019, value: 77.8 },
    { year: 2021, value: 78.0 }, { year: 2023, value: 78.5 }, { year: 2025, value: 78.9 },
  ],
  causes: [
    { cause: 'Heart disease', share: 27 },
    { cause: 'Cancer', share: 24 },
    { cause: 'Stroke', share: 11 },
    { cause: 'Respiratory disease', share: 9 },
    { cause: 'Accidents', share: 6 },
    { cause: 'Other', share: 23 },
  ],
  indicators: [
    { indicator: 'Life expectancy at birth', value: '78.9 years', year: 2025, source: 'ANSO Vital Statistics' },
    { indicator: 'Life expectancy, women', value: '81.2 years', year: 2025, source: 'ANSO Vital Statistics' },
    { indicator: 'Life expectancy, men', value: '76.5 years', year: 2025, source: 'ANSO Vital Statistics' },
    { indicator: 'Hospital beds per 1,000', value: '4.8', year: 2025, source: 'ANSO Health Survey' },
    { indicator: 'Doctors per 1,000', value: '3.4', year: 2025, source: 'ANSO Health Survey' },
    { indicator: 'Health spending, % of GDP', value: '8.2%', year: 2025, source: 'ANSO Public Finance' },
    { indicator: 'Infant mortality', value: '4.6 per 1,000', year: 2025, source: 'ANSO Vital Statistics' },
    { indicator: 'Smokers, adults 15+', value: '17.3%', year: 2025, source: 'ANSO Health Survey' },
  ],
};

export const EDUCATION = {
  literacy: 98.2,
  enrolment: [
    { level: 'Primary', rate: 99.4 },
    { level: 'Lower secondary', rate: 97.8 },
    { level: 'Upper secondary', rate: 91.5 },
    { level: 'Tertiary', rate: 58.3 },
  ],
  series: [
    { year: 2015, value: 96.9 }, { year: 2017, value: 97.3 }, { year: 2019, value: 97.6 },
    { year: 2021, value: 97.9 }, { year: 2023, value: 98.0 }, { year: 2025, value: 98.2 },
  ],
  indicators: [
    { indicator: 'Adult literacy (15+)', value: '98.2%', year: 2025, source: 'ANSO Education Survey' },
    { indicator: 'Primary enrolment, net', value: '99.4%', year: 2025, source: 'ANSO Education Survey' },
    { indicator: 'Secondary enrolment, net', value: '94.1%', year: 2025, source: 'ANSO Education Survey' },
    { indicator: 'Tertiary enrolment, gross', value: '58.3%', year: 2025, source: 'ANSO Education Survey' },
    { indicator: 'Pupils per teacher, primary', value: '14.2', year: 2025, source: 'ANSO Education Survey' },
    { indicator: 'Education spending, % of GDP', value: '5.1%', year: 2025, source: 'ANSO Public Finance' },
    { indicator: 'Graduates, tertiary', value: '41,800', year: 2025, source: 'ANSO Education Survey' },
    { indicator: 'Early school leavers', value: '6.4%', year: 2025, source: 'ANSO Education Survey' },
  ],
};

// Eight provinces. Population in thousands, GDP per capita in US dollars.
export const REGIONS = [
  { name: 'Meridian', capital: 'Port Meridian', population: 1420, area: 4820, density: 295, gdpPerCapita: 18900, unemployment: 3.4 },
  { name: 'Northgate', capital: 'Halden', population: 860, area: 12480, density: 69, gdpPerCapita: 13200, unemployment: 4.0 },
  { name: 'Eastvale', capital: 'Corvin', population: 640, area: 9860, density: 65, gdpPerCapita: 11800, unemployment: 4.6 },
  { name: 'Southshore', capital: 'Brelin', population: 590, area: 7210, density: 82, gdpPerCapita: 12700, unemployment: 3.9 },
  { name: 'Highmoor', capital: 'Tarn', population: 410, area: 11240, density: 36, gdpPerCapita: 10400, unemployment: 5.2 },
  { name: 'Westfield', capital: 'Ostro', population: 380, area: 6940, density: 55, gdpPerCapita: 12100, unemployment: 4.3 },
  { name: 'Lake District', capital: 'Vann', population: 310, area: 5840, density: 53, gdpPerCapita: 10900, unemployment: 4.8 },
  { name: 'Far Isles', capital: 'Skerry', population: 210, area: 3030, density: 69, gdpPerCapita: 9800, unemployment: 5.6 },
];

export const RELEASES = [
  { date: '18 Nov 2025', title: 'Consumer Price Index, October 2025', detail: 'Inflation eased to 2.6% as food prices fell 0.4% on the month.' },
  { date: '11 Nov 2025', title: 'Labour Force Survey, Q3 2025', detail: 'Unemployment down to 4.1%; employment up 38,000 on the quarter.' },
  { date: '4 Nov 2025', title: 'National Accounts, Q3 2025', detail: 'GDP grew 0.8% on the quarter; services led the rise.' },
  { date: '28 Oct 2025', title: 'Population Estimates, 2025', detail: 'Population reached 4.82 million; net migration added 22,800 people.' },
  { date: '21 Oct 2025', title: 'Trade in Goods, September 2025', detail: 'Exports rose 4.2% on the year; the surplus widened to $180 m.' },
  { date: '14 Oct 2025', title: 'Education Survey, 2025', detail: 'Adult literacy reached 98.2%; tertiary enrolment at 58.3%.' },
];

export const ALL_INDICATORS = [
  ...ECONOMY_INDICATORS,
  ...HEALTH.indicators,
  ...EDUCATION.indicators,
  { indicator: 'Population', value: '4.82 m', year: 2025, source: 'ANSO Population Register' },
  { indicator: 'Population density', value: '70.4 per km²', year: 2025, source: 'ANSO Population Register' },
  { indicator: 'Median age', value: '36.4 years', year: 2025, source: 'ANSO Population Register' },
  { indicator: 'Total fertility rate', value: '1.72', year: 2025, source: 'ANSO Vital Statistics' },
  { indicator: 'Births', value: '54,300', year: 2025, source: 'ANSO Vital Statistics' },
  { indicator: 'Deaths', value: '38,900', year: 2025, source: 'ANSO Vital Statistics' },
];
