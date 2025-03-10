import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCaK08azPwy3EYKhsPoYp0G6ymx5uWU0kU",
    authDomain: "local-explorer-f4917.firebaseapp.com",
    projectId: "local-explorer-f4917",
    storageBucket: "local-explorer-f4917.appspot.com",
    messagingSenderId: "249831676385",
    appId: "1:249831676385:web:b2df4af767115434181aa0",
    measurementId: "G-1KBKQN48JR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
