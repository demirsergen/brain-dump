import React, { useState, useEffect, useContext } from 'react';
import News from './News';
import { getAllNews } from './utils/getAllNews';
import { getGoogleNews } from './utils/getGoogleNews';
import { AuthContext } from '../Layout';

const AllNews = () => {
  const [news, setNews] = useState();
  const [query, setQuery] = useState('');

  const { currentUser } = useContext(AuthContext);
  const environment = process.env.NODE_ENV;

  const getData = async () => {
    if (currentUser && environment === 'development') {
      const data = await getAllNews();
      setNews(data);
    } else {
      const data = await getGoogleNews();
      setNews(data);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (currentUser && environment === 'development') {
      const data = await getAllNews(query);
      setNews(data);
      setQuery('');
    } else if (currentUser && environment === 'production') {
      const data = await getGoogleNews(query);
      setNews(data);
      setQuery('');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-600 h-screen text-teal-50 w-1/3 flex flex-col gap-2 px-2 rounded overflow-y-scroll">
      <div className="flex flex-col justify-between gap-1 py-2 sticky top-0 z-10 bg-slate-600">
        <h3 className="text-center font-bold">News</h3>
        <input
          type="text"
          name="search"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className="p-1 rounded flex-1 text-black text-sm"
        />
        <input
          type="submit"
          value="Search"
          onClick={handleSearch}
          className="bg-slate-500 p-1 rounded cursor-pointer text-sm"
        />
      </div>

      {news &&
        news.map((news, index) => <News key={index} news={news} />)}
    </div>
  );
};

export default AllNews;
