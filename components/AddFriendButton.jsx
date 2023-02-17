import React, { useContext, useState } from 'react';
import { AuthContext } from './Layout';

const AddFriendButton = () => {
  const { currentUser } = useContext(AuthContext);
  const [alreadyFriends, setAlreadyFriends] = useState(false);

  const checkFriend = () => {
    // check if friend exist, if it does, do not show add button and update state variable. return true or false
  };

  const addFriend = () => {};
  const removeFriend = () => {};

  if (alreadyFriends) {
    return (
      <button onClick={() => removeFriend(userId)}>Unfriend</button>
    );
  } else {
    return <button onClick={() => addFriend(userId)}>Add</button>;
  }
};

export default AddFriendButton;
