import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { ensureAppInitialized } from '@/logic/firebaseApp.ts';
import { userId } from '@/logic/auth.ts';

ensureAppInitialized();

const db = getFirestore();

export type Pod = {
  uid: string;
  name: string;
  photoUrl?: string;
  description: string;
  socials: object[];
  users: string[];
  moderators: string[];
};

export type NewPod = Omit<Pod, 'uid'>;

const podsRef = collection(db, 'pods');

function podFromSnap(snap: DocumentSnapshot): Pod {
  return {
    uid: snap.id,
    ...(snap.data() as NewPod),
  };
}

export async function createPod(newPod: NewPod): Promise<Pod> {
  const podRef = await addDoc(podsRef, newPod);
  const docSnap = await getDoc(podRef);

  return podFromSnap(docSnap);
}

export async function getPod(podId: string): Promise<Pod | null> {
  const snap = await getDoc(doc(podsRef, podId));

  if (snap.exists()) {
    console.log(`pod with uid [${podId}] exists`);
    return podFromSnap(snap);
  } else {
    console.log(`pod with uid [${podId}] does not exists`);
    return null;
  }
}

export async function getPods(): Promise<Pod[]> {
  const q = query(podsRef, where('users', 'array-contains', userId));
  const snap = await getDocs(q);

  return snap.docs.filter((doc) => doc.exists()).map((doc) => podFromSnap(doc));
}
