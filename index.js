import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

async function fetchTrendingTopicsRSS(countryCode) {
  const url = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=${countryCode}`;
  try {
    const response = await fetch(url);
    const xml = await response.text();
    const result = await parseStringPromise(xml);
    const items = result.rss.channel[0].item.slice(0, 5);
    return items.map(i => i.title[0]);
  } catch (error) {
    console.error(`Error fetching trends for ${countryCode}:`, error.message);
    return [];
  }
}

(async () => {
  for (const [country, code] of Object.entries({
    Netherlands: 'NL',
    'United States': 'US',
    India: 'IN'
  })) {
    const topics = await fetchTrendingTopicsRSS(code);
    console.log(`\nTop 5 Trending Topics in ${country}:`);
    topics.forEach((topic, i) => console.log(`${i + 1}. ${topic}`));
  }
})();


