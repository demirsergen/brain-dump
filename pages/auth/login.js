import { BsGoogle } from 'react-icons/bs';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NoteForLogin from '../../components/NoteForLogin';
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
  useAuthState,
} from 'react-firebase-hooks/auth';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');
  const [user] = useAuthState(auth);
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    emailPasswordUser,
    emailPasswordLoading,
    emailPasswordError,
  ] = useSignInWithEmailAndPassword(auth);
  const route = useRouter();

  const loginWithGoogle = async () => {
    await signInWithGoogle()
      .then(() => {
        route.push('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loginWithEmailAndPassword = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      signinForm.email,
      signinForm.password
    )
      .then(() => {
        route.push('/');
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSigninForm({ ...signinForm, [e.target.name]: value });
  };

  const createUserDocument = async (user) => {
    const userDocumentRef = doc(db, 'users', user.uid);
    await setDoc(userDocumentRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  useEffect(() => {
    if (user) {
      route.push('/');
    }
  }, [user]);

  if (!user) {
    return (
      <div className="shadow bg-slate-600 mt-16 p-4 w-full sm:w-3/4 md:w-2/4 lg:w-2/3 mx-auto rounded">
        <h1 className="text-2xl font-medium text-center text-teal-50">
          Login
        </h1>
        <form
          onSubmit={loginWithEmailAndPassword}
          className="shadow bg-slate-500 mt-4 p-4 w-full mx-auto rounded"
        >
          <div className="py-4 mx-auto text-center flex items-center justify-between">
            <label htmlFor="email" className="text-teal-50 text-sm">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={signinForm.email}
              onChange={handleChange}
              className="w-3/4 rounded text-sm p-1"
            />
          </div>
          <div className="py-4 mx-auto text-center flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-teal-50 text-sm"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={signinForm.password}
              onChange={handleChange}
              className="w-3/4 rounded text-sm p-1"
            />
          </div>
          <div className="py-2 mx-auto">
            <span className="text-center text-red-300 bg-black">
              {loginError || emailPasswordError?.message}
            </span>
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
  }
};

export default Login;
