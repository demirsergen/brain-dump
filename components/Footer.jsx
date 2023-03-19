import React from 'react';
import Link from 'next/link';

const Footer = () => {
  // add links, make it look prettier
  return (
    <footer className="flex items-center justify-between mt-4 p-8 md:w-1/2 lg:w-full mx-auto bg-slate-700">
      <Link href="/">
        <button className=" text-teal-50 font-bold">
          {' '}
          braindump
        </button>
      </Link>
      <ul className="flex flex-col">
        <li>
          <a
            href="https://github.com/demirsergen/brain-dump"
            className="text-teal-50"
          >
            Github
          </a>
        </li>
      </ul>

      <p className=" text-gray-400 font-bold">© 2022 braindump.</p>
    </footer>
  );
};

export default Footer;
