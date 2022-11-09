import React from "react";
import UserProfileHeader from "../components/userProfile/UserProfileHeader";
import UserPosts from "../components/userProfile/UserPosts";

const Profile = () => {
  return (
    <div className="shadow p-2 my-4  bg-slate-600 rounded md:w-1/2 mx-auto">
      <UserProfileHeader />
      <UserPosts />
    </div>
  );
};

export default Profile;
