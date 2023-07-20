import { useState } from 'react';
import { CgOptions } from 'react-icons/cg';
import OptionsOpen from '../OptionsOpen';
import { useRouter } from 'next/router';

const Options = ({ post, setShowModal, setDeleteId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  if (isOpen)
    return (
      <OptionsOpen
        post={post}
        setShowModal={setShowModal}
        setDeleteId={setDeleteId}
        setIsOpen={setIsOpen}
      />
    );

  if (router.pathname === '/profile')
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
