import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-teal-500 min-h-screen rounded-xl flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-teal-500 mb-6">
          Braindump
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Liberating minds through unfiltered thought.
        </p>
        <p className="text-gray-700 mb-4">
          At Braindump, we believe in the power of untamed imagination
          and authentic expression. Join our community and share your
          unfiltered thoughts with the world.
        </p>
        <Link href="/login">
          <button className="bg-orange-500 block my-2 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </Link>
        <Link href="/manifest">
          <button className="bg-orange-500 block hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
            Read our Manifest
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
