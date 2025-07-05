// https://blog.logrocket.com/user-authentication-firebase-react-apps/
// https://firebase.google.com/docs/auth/web/password-auth
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
// const {VITE_API_KEY,VITE_AUTH__DOMAIN,VITE_PROJECT_ID,VITE_STORAGE_BUCKET,VITE_MESSAGING_SENDER_ID,VITE_MEASUREMENT_ID} = import.meta.env;
// console.log("VITE_API_KEY,VITE_AUTH__DOMAIN,VITE_PROJECT_ID,VITE_STORAGE_BUCKET,VITE_MESSAGING_SENDER_ID,VITE_MEASUREMENT_ID",VITE_API_KEY,VITE_AUTH__DOMAIN,VITE_PROJECT_ID,VITE_STORAGE_BUCKET,VITE_MESSAGING_SENDER_ID,VITE_MEASUREMENT_ID)
const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH__DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Persistence error:", error);
});

const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// const getIdToken = async () => {
//   const user = auth.currentUser;
//   if (user) return await user.getIdToken();
//   return null;
// };

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthChange,
  // getIdToken
};
