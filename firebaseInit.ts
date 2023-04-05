import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import "firebase/auth";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDylP-ZXGdZ7oWCyAD4O5C82wisJrB0T_4",
  authDomain: "free-of-trash.firebaseapp.com",
  projectId: "free-of-trash",
  storageBucket: "free-of-trash.appspot.com",
  messagingSenderId: "532852690621",
  appId: "1:532852690621:web:b5c8f75fd982113ccc71d4",
};

let app;

if (getApps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp(app);
}

const db = getFirestore(app);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage(app);

export { db, auth, storage };
