import fetch from 'node-fetch';

async function fetchTrendingTopicsIndia() {
  const url = `https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN`;
  try {
    const response = await fetch(url);
    const xml = await response.text();

    // Match <title> tags (first one is feed title, skip it)
    const matches = [...xml.matchAll(/<title>(.*?)<\/title>/g)].map(m => m[1]);
    const topics = matches.slice(1, 6); // skip feed title, take top 5

    console.log("\nTop 5 Trending Topics in India:");
    topics.forEach((title, index) => {
      console.log(`${index + 1}. ${title}`);
    });
  } catch (error) {
    console.error("Error fetching trends for India:", error.message);
  }
}

fetchTrendingTopicsIndia();

