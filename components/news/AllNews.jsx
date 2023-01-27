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
    <div className="bg-slate-600 text-teal-50 w-1/3 flex flex-col gap-2 p-2 rounded">
      <h3 className="text-center font-bold">News</h3>
      {news?.map((news) => (
        <News key={news.id} news={news} />
      ))}
    </div>
  );
};

export default AllNews;
