import { useState } from 'react';
import { CgOptions } from 'react-icons/cg';
import OptionsOpen from '../OptionsOpen';

const Options = ({ post, setShowModal, setDeleteId }) => {
  // TODO
  // - if open => display Edit and Delete buttons

  const [isOpen, setIsOpen] = useState(false);

  if (isOpen)
    return (
      <OptionsOpen
        post={post}
        setShowModal={setShowModal}
        setDeleteId={setDeleteId}
      />
    );

  return (
    <div>
      <button
        className="flex items-center gap-2 text-teal-500 font-medium bg-teal-50 rounded p-1"
        onClick={() => {
          alert('clicked');
          setIsOpen((prev) => !prev);
        }}
      >
        <CgOptions />
      </button>
    </div>
  );
};

export default Options;
