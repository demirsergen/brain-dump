import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

export const signout = async () => {
  await signOut(auth)
    .then(() => {
      router.push('/auth/login');
    })
    .catch((error) => {
      console.error(error);
    });
};
