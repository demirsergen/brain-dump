import Link from 'next/link';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

const OptionsOpen = ({
  post,
  setDeleteId,
  setShowModal,
  setIsOpen,
}) => {
  return (
    <div className=" flex flex-col gap-2 absolute right-1 top-1 rounded bg-teal-500 p-1">
      <button
        className="ml-auto text-white"
        onClick={() => setIsOpen(false)}
      >
        X
      </button>
      <div className="flex flex-col gap-2 p-2">
        <button
          className="flex items-center gap-2 text-red-500 font-medium bg-teal-50 rounded p-1 text-sm"
          onClick={() => {
            setShowModal(true);
            setDeleteId(post.id);
          }}
        >
          <BsFillTrashFill />
          Delete
        </button>
        <Link href={{ pathname: '/addpost', query: post }}>
          <button className="flex items-center gap-2 text-teal-500 font-medium bg-teal-50 rounded p-1 text-sm">
            <AiFillEdit />
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OptionsOpen;
