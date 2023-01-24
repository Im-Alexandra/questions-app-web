import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_wgok2sBXroHU5Ae9s5tX_ScOok6kGQc",
  authDomain: "questions-game-baa4f.firebaseapp.com",
  projectId: "questions-game-baa4f",
  storageBucket: "questions-game-baa4f.appspot.com",
  messagingSenderId: "45674982220",
  appId: "1:45674982220:web:b9b82adc933523db5abde9",
  measurementId: "G-ZDVMBYW7K3",
};

//init firebase v. 9
const app = initializeApp(firebaseConfig);

//init services
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

//timestamp
//const timestamp = getFirestore().timestamp;
const timestamp = serverTimestamp();

export { db, auth, timestamp, storage };
