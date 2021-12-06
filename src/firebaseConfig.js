import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyABa0c3aLwUXTzBYR2NJ-ns3gJfqL-8C0Q",
    authDomain: "imessage-clone-b586c.firebaseapp.com",
    projectId: "imessage-clone-b586c",
    storageBucket: "imessage-clone-b586c.appspot.com",
    messagingSenderId: "814058624319",
    appId: "1:814058624319:web:b6c8cbe2c6252b1f1def8a",
    measurementId: "G-YEKNM4DXWB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db; 