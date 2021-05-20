import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBIJWyroiRTh74vTlXxcSqSb8TwycR8SZA",
  authDomain: "fabecook-2.firebaseapp.com",
  projectId: "fabecook-2",
  storageBucket: "fabecook-2.appspot.com",
  messagingSenderId: "269551663544",
  appId: "1:269551663544:web:6811472d3249f99c81b74d",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const storage = firebase.storage();

export { db, storage };
