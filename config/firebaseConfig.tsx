// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdVnsAP4xNQr1u2joSHHN9hITmISURF9A",
  authDomain: "cinema-app-33569.firebaseapp.com",
  projectId: "cinema-app-33569",
  storageBucket: "cinema-app-33569.appspot.com",
  messagingSenderId: "970586777116",
  appId: "1:970586777116:web:c4242d336d0a8bdcc5e1d9",
  databaseURL:
    "https://cinema-app-33569-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
