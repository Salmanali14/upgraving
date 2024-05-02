import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { getDatabase,update,get } from "firebase/database";
import firebase from 'firebase/compat/app';
const firebaseConfig = {
  apiKey: "AIzaSyB2MOBkz_AdZz_LepqDVxYxNo6kfYd7fGQ",
  authDomain: "upgraving-15a8a.firebaseapp.com",
  databaseURL: "https://upgraving-15a8a-default-rtdb.firebaseio.com",
  projectId: "upgraving-15a8a",
  storageBucket: "upgraving-15a8a.appspot.com",
  messagingSenderId: "167580376263",
  appId: "1:167580376263:web:faf678776837f48b48b2e2"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);
// const getDownloadURL = async (storageRef) => {
//   try {
//     const url = await ref(storage, storageRef).getDownloadURL();
//     return url;
//   } catch (error) {
//     console.error('Error getting download URL:', error);
//     throw error;
//   }
// };

export { app, auth, storage,db,firebaseConfig };
