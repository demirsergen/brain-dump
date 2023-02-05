import React, { useContext } from 'react';
import { AuthContext } from './Layout';

const AddFriendButton = () => {
  const { currentUser } = useContext(AuthContext);

  const checkFriend = () => {};

  return <button>Add</button>;
};

export default AddFriendButton;
