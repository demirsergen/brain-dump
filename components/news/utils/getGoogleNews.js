export async function getGoogleNews(query) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_GOOGLE_NEWS_API_KEY,
      'X-RapidAPI-Host': 'google-news-api1.p.rapidapi.com',
    },
  };

  const url = `https://google-news-api1.p.rapidapi.com/search?language=EN&q=${
    query || 'tech'
  }`;

  const response = await fetch(url, options);
  const data = await response.json();

  return data.news.news;
}
