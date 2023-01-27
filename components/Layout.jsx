import React, { useState, useEffect, createContext } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import AllNews from './news/AllNews';

export const AuthContext = createContext();

const Layout = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState();

  const getUpdatedUserInfo = async () => {
    if (user) {
      const docRef = doc(db, 'users', user?.uid);
      const data = await getDoc(docRef);
      setCurrentUser(data.data());
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    getUpdatedUserInfo();
  }, [user]);
  return (
    <AuthContext.Provider value={{ currentUser }}>
      <div className="w-full min-h-screen font-poppins bg-slate-800">
        <Navbar />
        <main className="flex-grow flex items-start justify-between gap-6 w-2/3 mx-auto">
          {children}
          <AllNews />
        </main>
      </div>
    </AuthContext.Provider>
  );
};

export default Layout;
