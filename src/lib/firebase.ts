
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'content-canvas-db',
  appId: '1:533339223653:web:0333fc6616af0edb48788c',
  storageBucket: 'content-canvas-db.firebasestorage.app',
  apiKey: 'AIzaSyDgWKxa1PRZvSK3bohO-e1tLzO0mvkmcMI',
  authDomain: 'content-canvas-db.firebaseapp.com',
  messagingSenderId: '533339223653',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
