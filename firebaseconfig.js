import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBc4ar-Ma3qTiYX9ooXJCaQpB4D9sus2O4",
  authDomain: "productlens-ed90b.firebaseapp.com",
  projectId: "productlens-ed90b",
  storageBucket: "productlens-ed90b.appspot.com",
  messagingSenderId: "908550209167",
  appId: "1:908550209167:web:2258b18e5ab16998867afa",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
