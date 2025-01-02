import { ensureAppInitialized } from '@/logic/firebaseApp.ts';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';

ensureAppInitialized();

const db = getFirestore();

const listingsRef = collection(db, 'listings');

export type Listing = {
    uid: string;
    title: string;
    user: string;
    pod: string;
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
