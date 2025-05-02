import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBJRf4PnsudBwNV4xJYc6RJITo6W0vL1_s",
  authDomain: "login-from-cd3e0.firebaseapp.com",
  projectId: "login-from-cd3e0",
  storageBucket: "login-from-cd3e0.appspot.com",
  messagingSenderId: "733725777713",
  appId: "1:733725777713:web:4a2f9d3344e00f6261da10"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

// UI Elements
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Form Toggle
loginTab.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  loginTab.classList.add('text-lime-600');
  signupTab.classList.remove('text-lime-600');
});

signupTab.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  signupTab.classList.add('text-lime-600');
  loginTab.classList.remove('text-lime-600');
});

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    localStorage.setItem("hopefundUser", JSON.stringify({
      name: user.displayName || "User",
      email: user.email
    }));

    window.location.href = "./home.html";
  } catch (error) {
    alert("Login Error: " + getErrorMessage(error.code));
  }
});

// Signup
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const terms = document.getElementById('terms').checked;

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });

    alert("Signup successful! You can now log in.");
    loginTab.click();
  } catch (error) {
    alert("Signup Error: " + getErrorMessage(error.code));
  }
});

// Google Login
document.getElementById("googleLoginBtn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    localStorage.setItem("hopefundUser", JSON.stringify({
      name: user.displayName || "User",
      email: user.email
    }));

    window.location.href = "./home.html";
  } catch (error) {
    console.error("Google Login Error:", error);
  
  }
});

// Auto Redirect if Already Logged In
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("auth")) {
    window.location.href = "./home.html";
  }
});

// Error Code Mapping
function getErrorMessage(code) {
  switch (code) {
    case 'auth/email-already-in-use': return 'Email already in use.';
    case 'auth/invalid-email': return 'Invalid email address.';
    case 'auth/user-not-found': return 'User not found.';
    case 'auth/wrong-password': return 'Incorrect password.';
    case 'auth/popup-closed-by-user': return 'Google popup was closed.';
    default: return 'An error occurred. Please try again.';
  }
}
