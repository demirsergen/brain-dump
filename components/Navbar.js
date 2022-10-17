import Link from "next/link";
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdAdd } from "react-icons/md";
import Image from "next/image";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex items-center justify-between p-4 md:w-1/2 mx-auto">
      <Link href="/">
        <button className=" text-teal-50 font-bold"> braindump</button>
      </Link>

      {user ? (
        <ul className="flex items-center gap-2">
          <Link href="/addpost">
            <a>
              <MdAdd className="bg-teal-500 rounded text-teal-50" size={30} />
            </a>
          </Link>
          <Link href="/profile">
            <Image
              src={user?.photoURL}
              alt="Picture of the profil owner"
              width={30}
              height={30}
              className="rounded-full"
            />
          </Link>
        </ul>
      ) : (
        <ul>
          <Link href="/auth/login">
            <button className=" px-4 py-2 bg-teal-500 rounded text-sm text-teal-50">
              Join Us
            </button>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
