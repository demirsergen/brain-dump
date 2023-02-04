import React from 'react';
import UpdateInfo from '../components/updateUserInfo/UpdateInfo';
import UpdateAvatar from '../components/updateUserInfo/UpdateAvatar';

const UpdateProfile = () => {
  return (
    <div className="py-2 bg-slate-600 rounded md:w-1/2 lg:w-2/3">
      <UpdateInfo />
      <UpdateAvatar />
    </div>
  );
};

export default UpdateProfile;
