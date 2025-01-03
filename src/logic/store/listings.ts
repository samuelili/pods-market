import { ensureAppInitialized } from '@/logic/firebaseApp.ts';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';

ensureAppInitialized();

const db = getFirestore();

const listingsRef = collection(db, 'listings');

export type Listing = {
    uid: string;
    title: string;

    userId: string;

    allPods: boolean;
    podIds: string[];

    location: string;
    price: number;
    description: string;
    images: string[];
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

export async function getListing(listingId: string) {
    const snap = await getDoc(doc(listingsRef, listingId));

    if (snap.exists())
        return {
            uid: snap.id,
            ...snap.data(),
        } as Listing;
    return null;
}

export async function getAllListings(): Promise<Listing[]> {
    const q = query(listingsRef);
    const snap = await getDocs(q);

    return snap.docs.filter((doc) => doc.exists()).map((doc) => ({
        uid: doc.id,
        ...doc.data(),
    } as Listing));
}

export async function getPodListings(podId: string): Promise<Listing[]> {
    const q = query(listingsRef, where("podIds", "array-contains", podId));
    const snap = await getDocs(q);

    return snap.docs.filter((doc) => doc.exists()).map((doc) => ({
        uid: doc.id,
        ...doc.data(),
    } as Listing));
}
