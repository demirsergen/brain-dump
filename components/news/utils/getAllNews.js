export async function getAllNews(query) {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  const date = new Date();
  let day = date.getDate() - 1;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const url = `https://newsapi.org/v2/everything?q=${
    query ? query : 'javascript'
  }&from=${year}-${month}-${day}&sortBy=popularity&pageSize=10&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.articles;
}
