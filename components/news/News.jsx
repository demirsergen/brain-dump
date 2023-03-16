import React from 'react';
import Image from 'next/image';

// either find a new api that can be used with free tier or
// do not display the news section in production

const News = ({ news }) => {
  if (process.env.NODE_ENV === 'production') {
    return <div>no news</div>;
  }
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="bg-slate-500 p-2 rounded flex flex-col gap-2 text-sm">
        <Image
          src={
            news.urlToImage ||
            'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
          }
          alt="news-image"
          width={250}
          height={100}
          className="block mx-auto"
        />
        <h3>{news.title}</h3>
        <a
          href={news.url}
          className="p-2 bg-slate-600 rounded text-center"
          target="_blank"
          rel="noreferrer"
        >
          Read more...
        </a>
      </div>
    );
  }
};

export default News;
