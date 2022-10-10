import { BsGoogle } from "react-icons/bs";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const Login = () => {
  const [user, loading] = useAuthState(auth);
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

  useEffect(() => {
    if (user) {
      route.push("/profile");
    } else {
      console.log("user changed.");
    }
  }, [user]);

  return (
    <div className=" shadow-xl mt-32 p-10 text-gray-700 ">
      <h1 className="text-2xl font-medium text-center">Login</h1>
      <div className="py-4 mx-auto text-center">
        <button
          className="mx-auto p-2  bg-teal-500 rounded text-teal-50 flex items-center justify-center gap-2 text-center pointer w-full "
          onClick={login}
        >
          <BsGoogle className="text-medium " />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
