// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

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

// Form Toggle
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

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

// Login Logic
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to the main website page without showing an alert
    window.location.href = "../src/index.html";  // Replace with your main website page URL
  } catch (error) {
    alert("Login Error: " + getErrorMessage(error.code));
  }
});

// Signup Logic
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const terms = document.getElementById('terms').checked;

  // Basic validation
  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all the fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  if (!terms) {
    alert("Please agree to the Terms and Conditions.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    alert("Signup successful! You can now login.");
    loginTab.click(); // Switch to login tab
  } catch (error) {
    alert("Signup Error: " + getErrorMessage(error.code));
  }
});

// Helper function to provide specific error messages
function getErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'The email address is already in use by another account.';
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/weak-password':
      return 'The password is too weak. It should be at least 6 characters.';
    case 'auth/user-not-found':
      return 'No user found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    default:
      return 'An error occurred. Please try again later.';
  }
}
