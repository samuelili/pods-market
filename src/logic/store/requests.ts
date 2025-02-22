import { ensureAppInitialized } from '@/logic/firebaseApp.ts';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  or,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { userId } from '@/logic/auth.ts';

ensureAppInitialized();

const db = getFirestore();

const requestsRef = collection(db, 'requests');

export type Request = {
  uid: string;
  senderId: string;
  receiverId: string;
  listingId: string;
  timestamp: number;
  message: string;
  accepted: boolean;
};

export type NewRequest = Omit<Request, 'uid'>;

export async function createRequest(request: NewRequest) {
  const docRef = await addDoc(requestsRef, request);
  const snap = await getDoc(docRef);

  if (snap.exists())
    return {
      uid: snap.id,
      ...snap.data(),
    } as Request;
  return null;
}

export async function getRequest(requestId: string) {
  const snap = await getDoc(doc(requestsRef, requestId));

  if (snap.exists())
    return {
      uid: snap.id,
      ...snap.data(),
    } as Request;
  return null;
}

export async function getAllRequests(): Promise<Request[]> {
  const q = query(
    requestsRef,
    or(where('senderId', '==', userId), where('receiverId', '==', userId)),
  );
  const snap = await getDocs(q);

  return snap.docs
    .filter((doc) => doc.exists())
    .map(
      (doc) =>
        ({
          uid: doc.id,
          ...doc.data(),
        }) as Request,
    );
}

export async function deleteRequest(requestId: string) {
  const snap = await getDoc(doc(requestsRef, requestId));

  if (snap.exists()) {
    const docRef = snap.ref;
    try {
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  } else {
    return false;
  }
}

export async function denyRequest(requestId: string) {
  return await deleteRequest(requestId);
}

export async function cancelSentRequest(requestId: string) {
  return await deleteRequest(requestId);
}

export async function acceptRequest(requestId: string) {
  const snap = await getDoc(doc(requestsRef, requestId));

  if (snap.exists()) {
    const docRef = snap.ref;
    try {
      await updateDoc(docRef, {
        accepted: true,
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  } else {
    return false;
  }
}
