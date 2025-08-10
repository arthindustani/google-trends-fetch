const fetch = require('node-fetch');
const xml2js = require('xml2js');

async function fetchTrendingTopics(countryCode) {
  const url = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${countryCode}`;
  try {
    const res = await fetch(url);
    const xml = await res.text();
    const parsed = await xml2js.parseStringPromise(xml);
    const items = parsed.rss.channel[0].item.slice(0, 5);
    return items.map(item => item.title[0]);
  } catch (err) {
    console.error(`Error fetching trends for ${countryCode}:`, err);
    return [];
  }
}

(async () => {
  const countries = [
    { name: 'Netherlands', code: 'NL' },
    { name: 'United States', code: 'US' },
    { name: 'India', code: 'IN' }
  ];

  for (const country of countries) {
    console.log(`\nTop 5 Trending Topics in ${country.name}:`);
    const topics = await fetchTrendingTopics(country.code);
    topics.forEach((topic, i) => console.log(`${i + 1}. ${topic}`));
  }
})();

