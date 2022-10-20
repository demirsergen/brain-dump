import { BsGoogle } from "react-icons/bs";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
  });
  const provider = new GoogleAuthProvider();
  const route = useRouter();

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      route.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = () => {};

  const handleChange = (e) => {
    const value = e.target.value;
    setSignupForm({ ...signupForm, [e.target.name]: value });
  };

  useEffect(() => {
    if (user) {
      route.push("/profile");
    } else {
      console.log("user changed.");
    }
  }, [user]);

  return (
    <div className="shadow bg-slate-600 mt-16 p-4 sm:w-full md:w-1/3 mx-auto rounded">
      <h1 className="text-2xl font-medium text-center text-teal-50">Login</h1>
      <form
        onSubmit={handleLogin}
        className="shadow bg-slate-500 mt-4 p-8 w-full md:w-1/3 mx-auto rounded"
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
          Login
        </button>
      </form>
      <Link href="/auth/signup">
        <button className="block mx-auto text-teal-50">
          Do you want to Signup?
        </button>
      </Link>
      <div className="py-4 mx-auto text-center">
        <button
          className="mx-auto p-2  bg-teal-500 rounded text-teal-50 flex items-center justify-center gap-2 text-center pointer w-full "
          onClick={login}
        >
          <BsGoogle className="text-medium " />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
