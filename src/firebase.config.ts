// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDPoTzHZCjnBQeqVmV1e09-qvXY24kInqE',
  authDomain: 'cfbytom-app.firebaseapp.com',
  projectId: 'cfbytom-app',
  storageBucket: 'cfbytom-app.appspot.com',
  messagingSenderId: '784860470676',
  appId: '1:784860470676:web:d72fdd471f2bfbd6c4c381',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicjalizujemy Firestore i Storage dla użycia w aplikacji
const firestore = getFirestore(app);
const storage = getStorage(app);

// Eksportujemy zainicjalizowane obiekty, aby były dostępne w innych plikach
export { app, firestore, storage };
