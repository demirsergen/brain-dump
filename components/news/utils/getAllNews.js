export async function getAllNews(query) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${
    query ? query : 'Apple'
  }&from=2023-01-26&sortBy=popularity&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.articles;
}
