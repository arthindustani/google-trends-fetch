const googleTrends = require('google-trends-api');

async function fetchTrendingTopics(countryCode) {
  try {
    const results = await googleTrends.dailyTrends({ geo: countryCode });
    const data = JSON.parse(results);
    return data.default.trendingSearchesDays[0].trendingSearches
      .slice(0, 5)
      .map(item => item.title.query);
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
