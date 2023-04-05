import { User, updateProfile } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebaseInit";

export const updateUserPhotoURL = async (user: User, storagePath: string) => {
  try {
    const url = await getDownloadURL(ref(storage, storagePath));

    await updateProfile(user, { photoURL: url });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
