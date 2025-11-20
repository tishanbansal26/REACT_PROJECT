import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase config (replace with your actual keys from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDP_JQlDxX5z_MPIYkt4opi1i0tj5McgmQ",
  authDomain: "coreline-2609.firebaseapp.com",
  projectId: "coreline-2609",
  storageBucket: "coreline-2609.firebasestorage.app",
  messagingSenderId: "732570123963",
  appId: "1:732570123963:web:9aeff8d28d38afa03a339e",
  measurementId: "G-W1Y1JDVBN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
