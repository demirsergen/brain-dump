import React, { useState, useEffect, useContext } from 'react';
import News from './News';
import { getAllNews } from './utils/getAllNews';
import { AuthContext } from '../Layout';

const AllNews = () => {
  const [news, setNews] = useState(null);
  const [query, setQuery] = useState('');

  const { currentUser } = useContext(AuthContext);

  const getData = async () => {
    const data = await getAllNews();

    setNews(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await getAllNews(query);

    setNews(data);
    setQuery('');
  };

  useEffect(() => {
    getData();
  }, []);

  if (currentUser) {
    return (
      <div className="bg-slate-600 h-screen text-teal-50 w-1/3 flex flex-col gap-2 p-2 rounded overflow-y-scroll">
        <h3 className="text-center font-bold">News</h3>
        <div className="flex justify-between gap-1">
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
        {news?.map((news) => (
          <News key={news.id} news={news} />
        ))}
      </div>
    );
  }
};

export default AllNews;
