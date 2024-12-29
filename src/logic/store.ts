import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { ensureAppInitialized } from '@/logic/firebaseApp.ts';
import { User } from '@/types/User.ts';

ensureAppInitialized();

const db = getFirestore();

const usersRef = collection(db, 'users');

export async function getUser(uid: string) {
  const q = query(usersRef, where("uid", "==", uid), limit(1));
  const snap = await getDocs(q);

  if (snap.size > 0 && snap.docs[0].exists()) {
    console.log(`user with uid [${uid}] exists`);
    return snap.docs[0].data() as User;
  } else {
    console.log(`user with uid [${uid}] does not exists`);
    return null;
  }
}

export async function addUser(user: User) {
  const userRef = await addDoc(collection(db, 'users'), user);
  const docSnap = await getDoc(userRef);

  return docSnap.data() as User;
}
