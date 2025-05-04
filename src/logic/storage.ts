import { ensureAppInitialized } from '@/logic/firebaseApp.ts';
import {
  getStorage,
  ref,
  StorageReference,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

ensureAppInitialized();

const storage = getStorage();

export const listingImagesRef = ref(storage, 'listing-images');
export const userProfileImagesRef = ref(storage, 'user-profile-images');
export const podImagesRef = ref(storage, 'pod-images');

export async function uploadFile(folderRef: StorageReference, file: File) {
  return await uploadBytes(ref(folderRef, file.name), file);
}

export async function uploadUserAvatarImage(file: File) {
  return uploadFile(userProfileImagesRef, file);
}

export async function uploadPodImage(file: File) {
  return uploadFile(podImagesRef, file);
}
export async function uploadListingImages(files: File[]) {
  return Promise.all(files.map((file) => uploadFile(listingImagesRef, file)));
}



export async function getStorageUrl(path: string) {
  return getDownloadURL(ref(storage, path));
}
