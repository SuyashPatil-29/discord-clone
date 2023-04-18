import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCl91Gc3wnTq6Ry57V72_zieKZlkdmGcF4",
  authDomain: "discord-clone-fe031.firebaseapp.com",
  projectId: "discord-clone-fe031",
  storageBucket: "discord-clone-fe031.appspot.com",
  messagingSenderId: "957220881664",
  appId: "1:957220881664:web:0e5ef00fd2a0c814c95fe5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = getStorage(firebaseApp);


export { auth, provider, storage};
export default db;

