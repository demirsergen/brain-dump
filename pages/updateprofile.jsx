import React from 'react';
import UpdateInfo from '../components/updateUserInfo/UpdateInfo';
import UpdateAvatar from '../components/updateUserInfo/UpdateAvatar';

const UpdateProfile = () => {
  return (
    <div className="my-4 py-4 bg-slate-600 rounded md:w-1/2 mx-auto">
      <UpdateInfo />
      <UpdateAvatar />
    </div>
  );
};

export default UpdateProfile;
