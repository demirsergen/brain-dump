import Link from 'next/link';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

const OptionsOpen = ({ post, setDeleteId, setShowModal }) => {
  return (
    <div className="bg-red-200">
      <h1>dadasd</h1>
      <button
        className="flex items-center gap-2 text-red-500 font-medium bg-teal-50 rounded p-1"
        onClick={() => {
          setShowModal(true);
          setDeleteId(post.id);
        }}
      >
        <BsFillTrashFill />
        Delete
      </button>
      <Link href={{ pathname: '/addpost', query: post }}>
        <button className="flex items-center gap-2 text-teal-500 font-medium bg-teal-50 rounded p-1">
          <AiFillEdit />
          Edit
        </button>
      </Link>
    </div>
  );
};

export default OptionsOpen;
