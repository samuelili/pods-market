import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addUser, getUser } from '@/logic/store.ts';
import { User } from '@/types/User.ts'; // firebase setup

// firebase setup
const auth = getAuth();

export let user: null | User = null;

export const checkUserPromise = new Promise<void>((resolve) => {
  auth.onAuthStateChanged(async (incomingUser) => {
    if (incomingUser) {
      console.log('got auth user:', incomingUser);

      user = await getUser(incomingUser.uid);
    }
    resolve();
  });
});

export async function createUser(email: string, password: string) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const newUser = await addUser({
      avatar: userCredential.user.photoURL,
      contacts: {},
      name: userCredential.user.displayName ?? 'Anonymous',
      pods: [],
      uid: userCredential.user.uid,
    });

    // Signed up
    console.log('Created account with:', newUser);
    user = newUser;

    return newUser;
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'errorCode' in error &&
      'errorMessage' in error
    )
      throw new Error(`(${error.errorCode}) ${error.errorMessage}`);
    throw error;
  }
}

export async function login(email: string, password: string) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Signed in
    const user = await getUser(userCredential.user.uid);

    console.log('Logged in with:', user, userCredential);

    return user;
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'errorCode' in error &&
      'errorMessage' in error
    )
      throw new Error(`(${error.errorCode}) ${error.errorMessage}`);
    throw error;
  }
}

export async function logout() {
  try {
    await signOut(auth);

    console.log('Logged out');

    user = null;
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'errorCode' in error &&
      'errorMessage' in error
    )
      throw new Error(`(${error.errorCode}) ${error.errorMessage}`);
    throw error;
  }
}
