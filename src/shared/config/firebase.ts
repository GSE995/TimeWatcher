import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyAtllEZr0-xR5GubUBQEmF_0hSFwPVxJ0E',
  authDomain: 'athletics-5dd9a.firebaseapp.com',
  databaseURL: 'https://athletics-5dd9a.firebaseio.com',
  projectId: 'athletics-5dd9a',
  storageBucket: 'athletics-5dd9a.appspot.com',
  messagingSenderId: '803168283340',
};

export default firebase.initializeApp(firebaseConfig);
