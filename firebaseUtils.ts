import { User, updateProfile } from "firebase/auth";
import { getDownloadURL, listAll, ref } from "firebase/storage";
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

export const setImagesFromStorage = async (id: string): Promise<void> => {
  // Create a reference under which you want to list
  const listRef = ref(storage, id);

  // Find all the prefixes and items.
  listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        // All the prefixes under listRef.
        // You may call listAll() recursively on them.
      });
      res.items.forEach((itemRef) => {
        // All the items under listRef.
        console.log(itemRef.fullPath);
      });
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};
