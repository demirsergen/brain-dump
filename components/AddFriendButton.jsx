import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './Layout';

const AddFriendButton = () => {
  const { currentUser } = useContext(AuthContext);
  const [alreadyFriends, setAlreadyFriends] = useState(false);

  const router = useRouter();
  const { userId } = router.query;

  const senderId = currentUser.id;
  const recipientId = userId;

  const sendFriendRequest = async (senderId, recipientId) => {
    try {
      // Create a new friend request document in the Firestore database
      await db.collection('friendRequests').add({
        sender: senderId,
        recipient: recipientId,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      alert('Friend request sent successfully!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  if (alreadyFriends) {
    return (
      <button onClick={() => addFriend(userId)}>Unfriend</button>
    );
  } else {
    return (
      <button
        onClick={() => sendFriendRequest(senderId, recipientId)}
      >
        Add
      </button>
    );
  }
};

export default AddFriendButton;
