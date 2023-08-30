import React, { useState } from 'react';

const SearchBar = ({ getSearchResults }) => {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      await getSearchResults(query);
      setMessage('');
      setQuery('');
    } else {
      setMessage('Enter a tag to search...');
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex rounded p-1 text-sm"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tags..."
          className="flex-grow px-1 py-1.5 rounded rounded-r-none"
        />
        <input
          type="submit"
          value="Search"
          className="p-1 text-white bg-teal-500 rounded cursor-pointer rounded-l-none"
        />
      </form>
      {message && (
        <p className="text-red-600 px-1 text-sm">{message}</p>
      )}
    </>
  );
};

export default SearchBar;
