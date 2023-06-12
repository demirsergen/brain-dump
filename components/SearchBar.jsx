import React, { useState } from 'react';

const SearchBar = () => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit} className="flex rounded p-1">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for keywords..."
        className="flex-grow p-1 rounded"
      />
      <input
        type="submit"
        value="Search"
        className="p-1 text-white bg-teal-500 rounded cursor-pointer"
      />
    </form>
  );
};

export default SearchBar;
