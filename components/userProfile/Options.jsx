import { useState } from 'react';
import { CgOptions } from 'react-icons/cg';

const Options = () => {
  // TODO
  // - if open => display Edit and Delete buttons

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="flex items-center gap-2 text-teal-500 font-medium bg-teal-50 rounded p-1"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <CgOptions />
      </button>
    </div>
  );
};

export default Options;
