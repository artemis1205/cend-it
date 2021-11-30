import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbbnI9ZVKSTWiMNC7CIhRnebsKv4Wslcs",
  authDomain: "cend-it.firebaseapp.com",
  databaseURL: "https://cend-it-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cend-it",
  storageBucket: "cend-it.appspot.com",
  messagingSenderId: "807693819563",
  appId: "1:807693819563:web:9147c7cdd9f6ca5cc8a1ee"
};


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function GoogleSignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(err => {
      console.error(err);
    })
  }

 


  return (
    <>
    <div className='SignUpPage'>
    
      <button className='SignInButton' onClick={signInWithGoogle}>Sign in with Google</button>

    
      </div>
   </>
  )
}

export default GoogleSignIn;
