import React from 'react';
import Image from 'next/image';
import defaultNews from '../../public/images/default-news.jpg';

const News = ({ news }) => {
  if (news) {
    return (
      <div className="bg-slate-500 p-2 rounded flex flex-col gap-2 text-sm">
        <Image
          src={defaultNews}
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
