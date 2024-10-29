import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDenmPHF2_-ZrhP_2cX4bf2grgRoZqP3OE",
  authDomain: "reselltracker-8d4ea.firebaseapp.com",
  projectId: "reselltracker-8d4ea",
  storageBucket: "reselltracker-8d4ea.appspot.com",
  messagingSenderId: "1019439923244",
  appId: "1:1019439923244:web:e8d629ef1608b0bc625189",
  measurementId: "G-QKS9ZSSB7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics conditionally
let analytics = null;
isSupported().then(yes => {
  if (yes) analytics = getAnalytics(app);
});

// Connect to emulators in development
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export { 
  auth, 
  db, 
  analytics, 
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
};