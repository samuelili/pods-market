import { ensureAppInitialized } from '@/logic/firebaseApp.ts';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getPods } from '@/logic/store/pods.ts';

ensureAppInitialized();

const db = getFirestore();

const listingsRef = collection(db, 'listings');

export type Listing = {
  uid: string;
  title: string;

  userId: string;
  podIds: string[];

  location: string;
  price: number;
  description: string;
  imageUrls: string[];
};

export type NewListing = Omit<Listing, 'uid'>;

export async function createListing(listing: NewListing) {
  const docRef = await addDoc(listingsRef, listing);
  const snap = await getDoc(docRef);

  if (snap.exists())
    return {
      uid: snap.id,
      ...snap.data(),
    } as Listing;
  return null;
}

export async function updateListing(
  listingId: string,
  update: Partial<Listing>,
): Promise<Listing | null> {
  await setDoc(doc(listingsRef, listingId), update, { merge: true });
  const docSnap = await getDoc(doc(listingsRef, listingId));

  if (docSnap.exists())
    return {
      uid: docSnap.id,
      ...docSnap.data(),
    } as Listing;
  return null;
}

export async function getListing(listingId: string) {
  const snap = await getDoc(doc(listingsRef, listingId));

  if (snap.exists())
    return {
      uid: snap.id,
      ...snap.data(),
    } as Listing;
  return null;
}

export async function removeListing(listingId: string) {
  const docRef = doc(listingsRef, listingId);

  await deleteDoc(docRef);
}

export async function getAllListings(): Promise<Listing[]> {
  const podIds = (await getPods()).map((pod) => pod.uid);

  const q = query(listingsRef);
  const snap = await getDocs(q);

  return snap.docs
    .filter((doc) => doc.exists())
    .map(
      (doc) =>
        ({
          uid: doc.id,
          ...doc.data(),
        }) as Listing,
    )
    .filter((listing) => podIds.includes(listing.uid));
}

export async function getPodListings(podId: string): Promise<Listing[]> {
  const q = query(listingsRef, where('podIds', 'array-contains', podId));
  const snap = await getDocs(q);

  return snap.docs
    .filter((doc) => doc.exists())
    .map(
      (doc) =>
        ({
          uid: doc.id,
          ...doc.data(),
        }) as Listing,
    );
}
