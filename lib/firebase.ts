import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB_XBOAX1b403oS6cilkl14cB1K9c_W16I",
  authDomain: "campus-connect-c939e.firebaseapp.com",
  databaseURL: "https://campus-connect-c939e-default-rtdb.firebaseio.com",
  projectId: "campus-connect-c939e",
  storageBucket: "campus-connect-c939e.appspot.com",
  messagingSenderId: "786469699931",
  appId: "1:786469699931:web:6024a43fd09e33d5a59a7e",
  measurementId: "G-TZWMCQ4543",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getDatabase(app)
export const storage = getStorage(app)

export default app
