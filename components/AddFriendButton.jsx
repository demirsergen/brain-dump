import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './Layout';

const AddFriendButton = () => {
  const { currentUser } = useContext(AuthContext);
  const [alreadyFriends, setAlreadyFriends] = useState(false);

  const checkFriend = () => {
    // friend checking functionality from Firebase.
    // update state
  };

  useEffect(() => {
    checkFriend();
  }, [])

  const addFriend = () => {
    // friend adding functionality
  };
  const removeFriend = () => {
    // friend removing functionality

  };

  if (alreadyFriends) {
    return (
      <button onClick={() => removeFriend(userId)}>Unfriend</button>
    );
  } else {
    return <button onClick={() => addFriend(userId)}>Add</button>;
  }
};

export default AddFriendButton;
