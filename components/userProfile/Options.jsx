import React from 'react';
import { SlOptions } from 'react-icons/sl';

const Options = () => {
  // TODO
  // - if open => display Edit and Delete buttons
  return (
    <div>
      <button className="flex items-center gap-2 text-teal-500 font-medium bg-teal-50 rounded p-1">
        <SlOptions />
      </button>
    </div>
  );
};

export default Options;
