import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyAtllEZr0-xR5GubUBQEmF_0hSFwPVxJ0E',
  authDomain: 'athletics-5dd9a.firebaseapp.com',
  databaseURL: 'https://athletics-5dd9a.firebaseio.com',
  projectId: 'athletics-5dd9a',
  storageBucket: 'athletics-5dd9a.appspot.com',
  messagingSenderId: '803168283340',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
