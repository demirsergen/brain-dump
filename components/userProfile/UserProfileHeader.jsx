import Image from 'next/image';
import defaultAvatar from '../../public/default-avatar.svg';
import UserProfileHeaderButtons from './UserProfileHeaderButtons';

const UserProfileHeader = ({ currentUser }) => {
  if (currentUser) {
    return (
      <div className="flex items-center gap-2 border-b-2 pb-2">
        <Image
          src={currentUser?.photoURL || defaultAvatar}
          alt="Picture of the profil owner"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h1 className="text-teal-50">
          {currentUser?.displayName ||
            currentUser?.username ||
            currentUser?.email}
        </h1>
        <UserProfileHeaderButtons />
      </div>
    );
  }
};

export default UserProfileHeader;
