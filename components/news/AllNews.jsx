import React, { useState, useEffect, useContext } from 'react';
import News from './News';
import { getAllNews } from './utils/getAllNews';
import { AuthContext } from '../Layout';

const AllNews = () => {
  const [news, setNews] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const getData = async () => {
    const data = await getAllNews();

    setNews(data);
  };

  useEffect(() => {
    getData();
  }, []);

  if (currentUser) {
    return (
      <div className="bg-slate-600 h-screen text-teal-50 w-1/3 flex flex-col gap-2 p-2 rounded overflow-y-scroll">
        <h3 className="text-center font-bold">News</h3>
        {news?.map((news) => (
          <News key={news.id} news={news} />
        ))}
      </div>
    );
  }
};

export default AllNews;
