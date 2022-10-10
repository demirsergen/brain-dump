import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-96 p-4 sm:w-3/4  mx-auto  font-poppins">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
