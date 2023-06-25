import Votes from './Votes';
import Post from './post/Post';

const AllPosts = ({ allPosts }) => {
  const environment = process.env.NODE_ENV;

  return (
    <div className="bg-slate-600 rounde w-full d p-2 flex flex-col gap-2 flex-grow">
      <h1 className="text-teal-50 text-center font-bold">
        Latest Posts
      </h1>
      {allPosts?.map((post) => (
        <div
          key={post.id}
          className={
            environment === 'development'
              ? 'flex mx-auto w-full'
              : 'flex mx-auto w-2/3'
          }
        >
          <Votes post={post} />
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
