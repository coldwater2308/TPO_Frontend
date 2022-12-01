import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDfxfLfno1u-pRKLXDABa7Mw-GLB_QLxZM",
  authDomain: "trainingandplacement-d0c77.firebaseapp.com",
  projectId: "trainingandplacement-d0c77",
  storageBucket: "trainingandplacement-d0c77.appspot.com",
  messagingSenderId: "750464869075",
  appId: "1:750464869075:web:61d7a5194f5b12015daa26",
  measurementId: "G-RJ0MDZ1CHE",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
