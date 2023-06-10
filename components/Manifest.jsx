import Link from 'next/link';
import React from 'react';

const Manifest = () => {
  return (
    <div className="bg-gray-100 min-h-screen w-full flex items-center justify-center">
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
          <p className="text-justify mb-2">
            At Braindump, we believe in the intrinsic value of
            unfiltered thought. Inspired by George Orwell's visionary
            novel, 1984, our purpose is to provide a social media
            platform where individuals can liberate their minds and
            share their raw, unedited trains of thought. We envision a
            space free from the constraints of self-censorship,
            promoting open and honest expression. Our platform serves
            as a sanctuary for the untamed imagination, uninhibited
            ideas, and unfiltered emotions. Braindump encourages users
            to break free from the shackles of conformity and dive
            into the depths of their innermost musings. In a world
            where social media often emphasizes curated perfection, we
            stand apart. We value authenticity over polished
            narratives, embracing the diversity of human thought and
            experience. By removing the need for constant validation
            and pleasing others, Braindump allows individuals to
            embrace their vulnerability and share their unvarnished
            truths. We aim to foster a community that thrives on the
            intellectual and emotional exploration of ideas. Through
            free-form thought sharing, we celebrate the unstructured,
            non-linear nature of the human mind. Braindump becomes a
            canvas where thoughts can collide, intertwine, and inspire
            one another, igniting new perspectives and driving
            meaningful conversations. As creators, we respect
            individual privacy and personal boundaries. Braindump
            provides robust privacy settings, empowering users to
            decide the extent of their thoughts' visibility. We stand
            against any form of abuse, harassment, or discrimination
            and are committed to maintaining a safe and inclusive
            environment for all users. Join us in reshaping the
            digital landscape. Together, let's unleash the power of
            unfiltered thought, fostering a community built on
            freedom, authenticity, and the pursuit of true connection.
            Step into the realm of Braindump, where thoughts run wild
            and minds are set free.
          </p>
          <button className="block mx-auto p-2 bg-teal-500 text-white rounded">
            <Link href="/auth/signup">Join Us</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manifest;
