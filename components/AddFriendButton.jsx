import React, { useContext, useState } from 'react';
import { AuthContext } from './Layout';

const AddFriendButton = () => {
  const { currentUser } = useContext(AuthContext);
  const [alreadyFriends, setAlreadyFriends] = useState(false);

  const checkFriend = () => {
    // check if friend exist, if it does do not show add button and update state variable
  };

  if (alreadyFriends) {
    return <button>Unfriend</button>;
  } else {
    return <button>Add</button>;
  }
};

export default AddFriendButton;
