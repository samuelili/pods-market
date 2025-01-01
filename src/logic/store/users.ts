import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { ensureAppInitialized } from '@/logic/firebaseApp.ts';
import { User } from '@/types/User.ts';

ensureAppInitialized();

const db = getFirestore();

const usersRef = collection(db, 'users');

export async function getUser(uid: string) {
  const snap = await getDoc(doc(usersRef, uid));

  if (snap.exists()) {
    console.log(`user with uid [${uid}] exists`);
    return snap.data() as User;
  } else {
    console.log(`user with uid [${uid}] does not exists`);
    return null;
  }
}

export async function addUser(user: User) {
  await setDoc(doc(usersRef, user.uid), user);

  const docSnap = await getDoc(doc(usersRef, user.uid));

  return docSnap.data() as User;
}

export async function updateUser(
  uid: string,
  update: Partial<User>,
): Promise<User> {
  await setDoc(doc(usersRef, uid), update, {
    merge: true,
  });

  const docSnap = await getDoc(doc(usersRef, uid));

  return docSnap.data() as User;
}

export async function addPodToUser(uid: string, podId: string): Promise<User> {
  const user = await getUser(uid);
  if (!user) throw new Error('user does not exist!');

  const newPods = [...user?.pods, podId];

  return await updateUser(uid, {
    pods: newPods,
  });
}
