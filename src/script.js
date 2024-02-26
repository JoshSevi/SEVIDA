// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8M7Srd08oiO2TdQM1SOcJrNTTqFi6rvU",
    authDomain: "sevida-co.firebaseapp.com",
    databaseURL: "https://sevida-co-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sevida-co",
    storageBucket: "sevida-co.appspot.com",
    messagingSenderId: "103373890355",
    appId: "1:103373890355:web:4b030e8cf63bc4af681446",
    measurementId: "G-5FYKB8KW6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

const MeowDay = doc (db, 'Meow/2021-09-14');
function meow() {
    const docData = {
        description: 'A delicious FINAL latte',
        price: 3.99,
        milk: 'Half',
        vegan: true,
    };
    setDoc(MeowDay, docData);
}
console.log('meow FINAL!');
meow();