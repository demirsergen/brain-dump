import React, { useState } from 'react';

const SearchBar = () => {
  const [input, setInput] = useState('');

  // implement searching functionality

  const handleSubmit = () => {};
  return (
    <form
      onSubmit={handleSubmit}
      className="flex rounded p-1 text-sm"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for keywords..."
        className="flex-grow p-1 rounded rounded-r-none"
      />
      <input
        type="submit"
        value="Search"
        className="p-1 text-white bg-teal-500 rounded cursor-pointer rounded-l-none"
      />
    </form>
  );
};

export default SearchBar;
