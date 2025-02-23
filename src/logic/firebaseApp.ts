import {FirebaseApp, initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pods-market-9aee6.firebaseapp.com",
  projectId: "pods-market-9aee6",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "907502338135",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export let app: FirebaseApp;

// @deprecated
export function ensureAppInitialized() {
  getFirebaseApp();
}

export function getFirebaseApp() {
  if (!app)
    app = initializeApp(firebaseConfig);

  return app;
}