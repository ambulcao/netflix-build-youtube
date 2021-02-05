import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCXDpuXoZAZgeTH-k5eubxSrJ20IfEL1-A",
  authDomain: "netflix-clone-22e29.firebaseapp.com",
  projectId: "netflix-clone-22e29",
  storageBucket: "netflix-clone-22e29.appspot.com",
  messagingSenderId: "767218640542",
  appId: "1:767218640542:web:bbf3bfae9b48a921503d8f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;