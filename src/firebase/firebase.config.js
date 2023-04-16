// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZE_j3fk0Rq5NVnZVLN03KmfBCx5qBTcM",
  authDomain: "emaa-john-project-firbase-auth.firebaseapp.com",
  projectId: "emaa-john-project-firbase-auth",
  storageBucket: "emaa-john-project-firbase-auth.appspot.com",
  messagingSenderId: "899657463406",
  appId: "1:899657463406:web:ce5dfb1551a40b478a987f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;