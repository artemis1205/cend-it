import React, {useState, useEffect} from 'react';
import './App.css';
import GoogleSignIn from "./GoogleSignIn";
const Login = (props) => {
const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
    
    useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);
    
     const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
    
    const {email, setEmail, password, setPassword, handleLogin, handleSignup, handleLogout, hasAccount, setHasAccount, emailError, passwordError} = props;
    return (

        <section>
        <div className="logincontainer">
           
            <input placeholder="Email" className="Login-Mail"type="text" autoFocus required value={email }  onChange={(e) => setEmail(e.target.value)}/>
            <h2></h2>
        
            <input placeholder="Password"className="Login-Password" type="password"  required value={password}  onChange={(e) => setPassword(e.target.value)}/>
            
            <div className="Buttoncontainers">
            {hasAccount ?(
                <>
                
                <p>Don't have an account? <span style={{color:"#5f91e8"}} onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                <button className="Sign" onClick={handleLogin}>Sign in</button>
                </>
            ): (
                <>
                
                <p>Have an account? <span style={{color:"#5f91e8"}} onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                <button className="Sign" onClick={handleSignup}>Sign up</button>
    <button
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Install
    </button>
                </>
            )}
       
            </div>
            <GoogleSignIn/>
            
        </div>
        <p className="errormsg">{emailError}</p>
            <p className="errormsg">{passwordError}</p>
     
       
        </section>
    )
}

export default Login;
