import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addUser, getUser } from '@/logic/store/users.ts';
import { User } from '@/types/User.ts';
import { getQueryClient } from '@/logic/queryClient.ts';
import queries from '@/logic/queries.ts'; // firebase setup

// firebase setup
const auth = getAuth();
const queryClient = getQueryClient();

export let userId = '';
export const NAME_UNSET = "ASDFASDFASDF_UNSET"; // make sure no one accidentally sets this name lol
export const firstCheckPromise = new Promise<string | null>((resolve) => {
  auth.onAuthStateChanged(async (incomingUser) => {
    if (incomingUser) {
      console.log('got auth user:', incomingUser);

      const user = await getUser(incomingUser.uid);
      setCurrentUser(user);

      userId = incomingUser.uid;
      resolve(incomingUser.uid);
    }
    resolve(null);
  });
});

export function getCurrentUser() {
  return queryClient.getQueryData(
    queries.users.current.queryKey,
  ) as User | null;
}

export function setCurrentUser(user: User | null | undefined) {
  console.log('setCurrentUser', user);
  return queryClient.setQueryData(queries.users.current.queryKey, user);
}

/* ==============================================
 *              FIREBASE CALLS
============================================== */

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
      name: userCredential.user.displayName ?? NAME_UNSET,
      pods: [],
      uid: userCredential.user.uid,
    });

    // Signed up
    console.log('Created account with:', newUser);
    userId = newUser.uid;
    setCurrentUser(newUser);

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
    userId = user!.uid;
    setCurrentUser(user!);

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
    await getQueryClient().invalidateQueries(queries.users.current);

    console.log('Logged out');

    setCurrentUser(undefined);
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
