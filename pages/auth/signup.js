import React, { useState } from "react";
import Link from "next/link";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useRouter } from "next/router";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const route = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    setSignupForm({ ...signupForm, [e.target.name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    await createUserWithEmailAndPassword(signupForm.email, signupForm.password)
      .then((userCredential) => {
        const userCollectionRef = collection(db, "users");
        addDoc(userCollectionRef, {
          userId: userCredential.user.uid,
          email: userCredential.user.email,
        });
      })
      .then(() => {
        route.push("/profile");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div className="shadow bg-slate-600 mt-16 p-4 w-full sm:w-3/4 md:w-2/4 lg:w-1/3 mx-auto rounded">
      <h1 className="text-2xl font-medium text-center text-teal-50 ">
        Sign Up
      </h1>
      <form
        onSubmit={handleSignup}
        className="shadow bg-slate-500 mt-4 p-4 text-gray-700 mx-auto rounded"
      >
        <div className="py-4 mx-auto text-center flex items-center justify-between">
          <label htmlFor="email" className="text-teal-50 text-sm">
            Email:
          </label>
          <input
            required
            type="email"
            name="email"
            value={signupForm.email}
            onChange={handleChange}
            className=" rounded text-sm p-1 w-3/4"
            placeholder="Email"
          />
        </div>
        <div className="py-4 mx-auto text-center flex items-center justify-between ">
          <label htmlFor="password" className="text-teal-50 text-sm">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={signupForm.password}
            onChange={handleChange}
            className="w-3/4 rounded text-sm p-1"
            placeholder="Password"
            required
          />
        </div>
        <div className="py-4 mx-auto text-center flex items-center justify-between">
          <label htmlFor="confirmPassword" className="text-teal-50 text-sm">
            Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={signupForm.confirmPassword}
            onChange={handleChange}
            className="w-3/4 rounded text-sm p-1"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="py-2 mx-auto text-center">
          <span className=" text-red-300">{error || userError}</span>
        </div>
        <button
          className="text-teal-50 bg-teal-500 p-2 block mx-auto rounded w-full"
          onClick={handleSignup}
        >
          Sign up
        </button>
      </form>
      <Link href="/auth/login">
        <button className="text-teal-50 block mx-auto">
          Already have an account?
        </button>
      </Link>
    </div>
  );
};

export default Signup;
