import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { addUser, getUser } from '@/logic/store/users.ts';
import { User } from '@/types/User.ts';
import { getQueryClient } from '@/logic/queryClient.ts';
import queries from '@/logic/queries.ts';
import { fetchImage } from '@/logic/misc.ts';
import { uploadUserAvatarImage } from '@/logic/storage.ts';

// firebase setup
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const queryClient = getQueryClient();

export let userId = '';
export const NAME_UNSET = 'ASDFASDFASDF_UNSET'; // make sure no one accidentally sets this name lol
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

// noinspection JSUnusedGlobalSymbols
export function getCurrentUser() {
  return queryClient.getQueryData(
    queries.users.current.queryKey,
  ) as User | null;
}

export function setCurrentUser(user: User | null | undefined) {
  console.log('setCurrentUser', user);
  return queryClient.setQueryData(queries.users.current.queryKey, user);
}

function throwError(error: any) {
  if (
    error &&
    typeof error === 'object' &&
    'errorCode' in error &&
    'errorMessage' in error
  )
    throw new Error(`(${error.errorCode}) ${error.errorMessage}`);
  throw error;
}

/* ==============================================
 *              FIREBASE CALLS
============================================== */

async function createUser(userCredential: UserCredential) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    let avatar: string | null = null;
    if (userCredential.user.photoURL) {
      console.log('Found a photoURL, attempting to grab it..');
      try {
        const image = await fetchImage(
          userCredential.user.photoURL,
          userCredential.user.uid,
        );
        const result = await uploadUserAvatarImage(image);
        avatar = result.ref.fullPath;
      } catch (e) {
        console.error(e);
        console.error(
          'Something went wrong while trying to download or upload user avatar, moving on...',
        );
      }
    }

    const newUser = await addUser({
      avatar,
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

export async function createUserWithEmailPassword(
  email: string,
  password: string,
) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return createUser(userCredential);
}

async function login(userCredential: UserCredential) {
  // Signed in
  const user = await getUser(userCredential.user.uid);
  userId = user!.uid;
  setCurrentUser(user!);

  console.log('Logged in with:', user, userCredential);

  return user;
}

export async function logout() {
  try {
    await signOut(auth);
    await getQueryClient().invalidateQueries(queries.users.current);

    console.log('Logged out');

    setCurrentUser(undefined);
  } catch (error: any) {
    throwError(error);
  }
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string,
) {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return login(userCredential);
  } catch (error) {
    throwError(error);
  }
}

export async function loginWithGoogle() {
  try {
    await setPersistence(auth, browserLocalPersistence);

    console.log('Attempting to login with Google...');
    const userCredential = await signInWithPopup(auth, googleProvider);
    console.log('Logged In with Google...');

    const user = await getUser(userCredential.user.uid);
    const firstTime = user === null;

    if (firstTime) {
      console.log('User Not Found, creating new User');
      return createUser(userCredential);
    } else {
      console.log('User Found, Logging in Normally!');
      return login(userCredential);
    }
  } catch (error) {
    throwError(error);
  }
}
