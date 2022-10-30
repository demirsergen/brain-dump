import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen mx-auto font-poppins bg-slate-800">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
