import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAIY00lS2wwsj-MHjJi4h6F3pzZlH7uo9I",
    authDomain: "lelong-too-project.firebaseapp.com",
    databaseURL: "https://lelong-too-project-default-rtdb.firebaseio.com",
    projectId: "lelong-too-project",
    storageBucket: "lelong-too-project.appspot.com",
    messagingSenderId: "951849359234",
    appId: "1:951849359234:web:140ec68325eb96630d219b",
    measurementId: "G-YDB88VM1TG"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getDatabase(app);