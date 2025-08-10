import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

async function fetchTrendingTopicsIndia() {
  const url = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN`;
  try {
    const response = await fetch(url);
    const xml = await response.text();
    const result = await parseStringPromise(xml);
    const items = result.rss.channel[0].item.slice(0, 5);
    console.log("\nTop 5 Trending Topics in India:");
    items.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title[0]}`);
    });
  } catch (error) {
    console.error("Error fetching trends for India:", error.message);
  }
}

fetchTrendingTopicsIndia();



