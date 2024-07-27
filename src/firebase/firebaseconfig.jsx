/** @format */

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyDLe1QUByV2AUqmL_c3zLtLLn1wv-dDXDQ",
	authDomain: "farmaid-ec5d6.firebaseapp.com",
	projectId: "farmaid-ec5d6",
	storageBucket: "farmaid-ec5d6.appspot.com",
	messagingSenderId: "663260967698",
	appId: "1:663260967698:web:5a737342c67acc762679cb",
	measurementId: "G-CFBD20P620",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, db, storage, provider };
