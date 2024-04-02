import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = { apiKey: "AIzaSyCXQRMzZPFw6vYg5Yt9i8dimyBsTK5p_c0", authDomain: "sentisurvey-e0783.firebaseapp.com", projectId: "sentisurvey-e0783", storageBucket: "sentisurvey-e0783.appspot.com", messagingSenderId: "423717846658", appId: "1:423717846658:web:dbd1bd84c478077687be9b", measurementId: "G-FLNX057SKK" }
const app = initializeApp(firebaseConfig);

const auth = getAuth()

export default auth