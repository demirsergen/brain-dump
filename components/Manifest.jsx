import Link from 'next/link';
import React from 'react';

const Manifest = () => {
  // upate this.
  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center rounded">
      <div className=" mx-auto p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-teal-500 mb-6 text-center">
          Manifesto
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Liberating minds through unfiltered thought.
        </p>
        <div className="mt-8 text-sm text-gray-500">
          <h2 className="font-bold mb-2 text-lg">Slogan:</h2>
          <p className="text-justify mb-2">
            Liberty in Expression, Transparency in Thought{' '}
          </p>
          <h2 className="font-bold mb-2 text-lg">Manifesto:</h2>
          <p className="text-justify mb-2">TBA</p>
          <button className="block mx-auto px-8 p-2 bg-teal-500 text-white rounded">
            <Link href="/auth/signup">Join Us</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manifest;
