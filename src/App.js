import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Login from './Login';
import { AuthContext } from "auth-context";


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
 const firestore = firebase.firestore()


function App() {

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("")
    setPassword("")
  }  

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }
  const handleLogin = () => {
    clearErrors();
    
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        
      }
    })
  }

  const handleSignup = () => {
    console.log(email);
  
    firebase.auth().createUserWithEmailAndPassword( email, password)
    .catch(err => {
      switch(err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
        
      }
    })
  }

  const handleLogout = () => {
    firebase.auth().signOut();
  }

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user)=> {
      if(user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("")
      }
    })
  }

  useEffect(() => {
    authListener();
  }, [])

  return(
    <div>
      {user ? (
        <ChatRoom />
        
      ): (
        <>
        <div className="triangle"></div>
    <h1 className="Title">CEND-IT</h1>
        <Login email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} handleSignup={handleSignup} handleLogout={handleLogout} hasAccount={hasAccount} setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError}/>  
        
</>
      )}
      
    </div>
  )
}




function SignOut() {
  return auth.currentUser && (
    <button className="SignOut" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const uid = auth.currentUser;
  const username = auth.currentUser.email;

  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'asc').limit(300);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const today = new Date();


    
  
 const vibration = () => {
  const canVibrate = navigator.vibrate
  if (canVibrate) navigator.vibrate(1000);
  console.log("vibrate");
}

  const sendMessage = async(e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;
    

   
    await messagesRef.add({
      text: formValue,
      createdAt: Date.now(),
      uid, 
      photoURL,
      name: username,
      time: ("0"+today.getHours()).slice(-2) + ':' + ("0"+today.getMinutes()).slice(-2)
    })
    
    setFormValue('');
    const canVibrate = navigator.vibrate
    if (canVibrate) navigator.vibrate(1000);
    console.log("vibrate");
    
    dummy.current.scrollIntoView({behavior: 'smooth'});
   
  }
  return (
    <>
    <div className="top">
      <div className="flex">
      
    <SignOut />
    <h1 className="chat-title">Cend-It</h1>
    </div>
    </div>
   
    
      <main className="Messages">
      {messages && messages.map(msg => <ChatMessage  key={msg.id} message={msg} />)}
      <div ref={dummy}></div>
      </main> 
<div className="bottom">
      <form className="form" onSubmit={sendMessage}>
        <input className="input-message" type="text"  value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
        <button onClick={vibration}className="Send" type='submit'>Send</button>
      </form>
      </div>
    </>
  )
}

function ChatMessage (props) {

    const {text, uid, photoURL, name, time} = props.message;
  
  
    const messageClass = uid === auth.currentUser.uid?'sent':'received';

    return (
      <div className={`message ${messageClass}`}>
       <h2>{name}</h2>
        <div className="text">
         
        <p>{text}</p>
        </div>
   <h3>{time}</h3>
      </div>
    )
  }





  
export default App;
