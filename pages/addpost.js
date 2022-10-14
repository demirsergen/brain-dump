import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

const Addpost = () => {
  const [user, loading] = useAuthState(auth);
  const [dump, setDump] = useState({
    text: "",
    tag: "",
  });

  const router = useRouter();
  const routerData = router.query;

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.value;
    setDump({
      ...dump,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dumpCollectionRef = collection(db, "dumps");
    await addDoc(dumpCollectionRef, {
      ...dump,
      timestamp: serverTimestamp(),
      userId: user.uid,
      username: user.displayName,
      avatar: user.photoURL,
    });

    setDump({
      text: "",
      tag: "",
    });

    router.push("/");
  };

  const checkForEdit = () => {
    if (routerData.id) {
      setDump({
        text: routerData.text,
        id: routerData.id,
        tag: routerData.tag,
      });
    }
  };

  useEffect(() => {
    checkForEdit();
  }, [user, loading]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dumpRef = doc(db, "dumps", routerData.id);
    console.log("ran!");
    await updateDoc(dumpRef, {
      text: dump.text,
      tag: dump.tag,
      updated: true,
    });

    router.push("/profile");
  };

  return (
    <div className="my-4 py-4 bg-slate-600 rounded">
      <h1 className="text-teal-50 text-center uppercase font-bold">
        {routerData.id ? "Update Your Dump" : "Share a new Dump"}
      </h1>
      <form
        className="px-2"
        onSubmit={routerData.id ? handleUpdate : handleSubmit}
      >
        <div className="p-2 rounded">
          <label htmlFor="dump" className="text-teal-50">
            Dumpland:
          </label>
          <br />
          <textarea
            name="text"
            cols="30"
            rows="7"
            className="w-full bg-gray-100 p-2 rounded "
            placeholder="Let your mind speak..."
            value={dump.text}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="p-2 rounded">
          <label htmlFor="tag" className="text-teal-50">
            Tag:
          </label>
          <br />
          <input
            type="text"
            name="tag"
            className="w-full bg-gray-100 p-2 rounded"
            placeholder="daily, friendship, tech?"
            value={dump.tag}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-teal-50 w-full text-bold my-2 p-2 rounded block mx-auto"
        >
          {routerData.id ? "Update" : "Share"}
        </button>
      </form>
    </div>
  );
};

export default Addpost;
