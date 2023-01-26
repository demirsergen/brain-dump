import React, { useState, useEffect } from 'react';
import News from './News';
import { getAllNews } from './utils/getAllNews';

const AllNews = () => {
  const [news, setNews] = useState(null);

  const getData = async () => {
    const data = await getAllNews();

    setNews(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white hidden">
      <h3>News</h3>
      {news?.map((news) => (
        <News key={news.id} news={news} />
      ))}
    </div>
  );
};

export default AllNews;
