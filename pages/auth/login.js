import { BsGoogle } from "react-icons/bs";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import NoteForLogin from "../../components/NoteForLogin";

const Login = () => {
  const [user, loading] = useAuthState(auth);
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  const provider = new GoogleAuthProvider();
  const route = useRouter();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      route.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const loginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    console.log(signinForm);
    await signInWithEmailAndPassword(
      auth,
      signinForm.email,
      signinForm.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user, "function ran!");
        route.push("/profile");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSigninForm({ ...signinForm, [e.target.name]: value });
  };

  useEffect(() => {
    if (user) {
      route.push("/profile");
    }
  }, [user]);

  return (
    <div className="shadow bg-slate-600 mt-16 p-4 sm:w-full md:w-1/3 mx-auto rounded">
      <h1 className="text-2xl font-medium text-center text-teal-50">Login</h1>
      <form
        onSubmit={loginWithEmailAndPassword}
        className="shadow bg-slate-500 mt-4 p-4 w-full mx-auto rounded"
      >
        <div className="py-4 mx-auto text-center flex items-center justify-between gap-12">
          <label htmlFor="email" className="text-teal-50">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={signinForm.email}
            onChange={handleChange}
            className="w-full rounded text-sm p-1"
          />
        </div>
        <div className="py-4 mx-auto text-center flex items-center justify-between gap-4">
          <label htmlFor="password" className="text-teal-50">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={signinForm.password}
            onChange={handleChange}
            className="w-full rounded text-sm p-1"
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
          onClick={loginWithGoogle}
        >
          <BsGoogle className="text-medium " />
          Continue with Google
        </button>
      </div>
      <NoteForLogin />
    </div>
  );
};

export default Login;
