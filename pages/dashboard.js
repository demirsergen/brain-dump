import { useRouter } from "next/router";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  return (
    <div className="shadow my-4 py-4">
      <form action="">
        {/* Todo
            - hook firestore and upload post
            - show it on homepage
        */}
        <div className="p-2 rounded">
          <label htmlFor="dump">Dumpland:</label>
          <br />
          <textarea
            name="dump"
            cols="30"
            rows="5"
            className="w-full bg-gray-100 p-2 rounded"
            placeholder="Let your mind speak..."
          ></textarea>
        </div>
        <div className="p-2 rounded">
          <label htmlFor="tags">Tags:</label>
          <br />
          <input
            type="text"
            className="w-full bg-gray-100 p-2 rounded"
            placeholder="daily, friendship, tech?"
          />
        </div>
        <button className="bg-orange-300 p-2 rounded block mx-auto">
          Share!
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
