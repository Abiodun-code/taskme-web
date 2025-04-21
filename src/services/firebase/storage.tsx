// firebase/storage.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase"; // your firebase.ts file

const storage = getStorage();

export const uploadProfilePicture = async (file: File): Promise<string> => {
  if (!auth.currentUser) {
    throw new Error("No user logged in");
  }

  const fileRef = ref(storage, `users/${auth.currentUser.uid}/profile.jpg`);

  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);

  return downloadURL; // returns the public URL of the uploaded image
};
