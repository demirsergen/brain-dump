import React, { useState } from 'react';

const News = ({ news }) => {
  return (
    <>
      <h3>{news?.title}</h3>
      <p>{news?.summary}</p>
      <a href={news.url}>Read more...</a>
    </>
  );
};

export default News;
