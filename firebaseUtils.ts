import { User, updateProfile } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebaseInit";
import { DocumentReference, doc, getDoc, updateDoc } from "firebase/firestore";

export const updateUserPhotoURL = async (
  user: User,
  storagePath: string,
  reference: DocumentReference
) => {
  try {
    const url = await getDownloadURL(ref(storage, storagePath));

    await updateProfile(user, { photoURL: url });

    await updateDoc(reference, {
      photoURL: url,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const readUserProvince = async (currentUser: User) => {
  const docRef = doc(db, "users", currentUser?.uid!);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data().province;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
