import {ensureAppInitialized} from "@/logic/firebaseApp.ts";
import {collection, getFirestore} from "firebase/firestore";

ensureAppInitialized();

const db = getFirestore();

const listingsRef = collection(db, "listings");