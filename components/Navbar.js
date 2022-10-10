import Link from "next/link";
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdAdd } from "react-icons/md";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const linkHref = user ? "/profile" : "/auth/login";

  return (
    <nav className="flex items-center justify-between">
      <Link href="/">
        <button className="font-medium">Brain Dump</button>
      </Link>

      {user ? (
        <ul className="flex items-center gap-2">
          <Link href="/dashboard">
            <a>
              <MdAdd className="bg-gray-100" size={30} />
            </a>
          </Link>
          <Link href="/profile">
            <button className=" px-4 py-2 bg-teal-500 rounded text-sm text-teal-50">
              Profile
            </button>
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
