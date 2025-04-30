import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJRf4PnsudBwNV4xJYc6RJITo6W0vL1_s",
  authDomain: "login-from-cd3e0.firebaseapp.com",
  projectId: "login-from-cd3e0",
  storageBucket: "login-from-cd3e0.appspot.com",
  messagingSenderId: "733725777713",
  appId: "1:733725777713:web:4a2f9d3344e00f6261da10",
  measurementId: "G-5BBTCQWJ8Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Get current user
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      document.getElementById("userName").textContent = userData.name;
      document.getElementById("userEmail").textContent = userData.email;
      document.getElementById("userInfo").classList.remove("hidden");
    }
  } else {
    console.log("No user logged in.");
  }
});
