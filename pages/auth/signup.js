import React, { useState } from "react";
import Link from "next/link";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSignupForm({ ...signupForm, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupForm);
  };
  return (
    <div className="shadow bg-slate-600 mt-16 p-4 sm:w-full md:w-1/3 mx-auto rounded">
      <h1 className="text-2xl font-medium text-center text-teal-50 ">Signup</h1>
      <form
        onSubmit={handleSubmit}
        className="shadow bg-slate-500 mt-4 p-8 text-gray-700 md:w-1/3 mx-auto rounded"
      >
        <div className="py-4 mx-auto text-center flex items-center justify-between">
          <label htmlFor="email" className="text-teal-50">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={signupForm.email}
            onChange={handleChange}
          />
        </div>
        <div className="py-4 mx-auto text-center flex items-center justify-between">
          <label htmlFor="password" className="text-teal-50">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={signupForm.password}
            onChange={handleChange}
            className=""
          />
        </div>
        <button className="text-teal-50 bg-teal-500 p-2 block mx-auto rounded w-full">
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