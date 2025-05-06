/* 
Login Window component that renders login window

Authored: David Kipnis, 2025
*/

import '../styles/LoginWindow.css'

import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const LoginWindow = (props) => {

    const [inputEmail, setInputEmail] = useState('');
    const [inputPass, setInputPass] = useState('');

    const [awaitingLogin, setAwaitingLogin] = useState(false);
    const [failedLogin, setFailedLogin] = useState(false);

    const handleEmailChange = (event) => {
        setInputEmail(event.target.value);
    };

    const handlePassChange = (event) => {
        setInputPass(event.target.value);
    };

    const handleLogin = async (setUserFunction, email, pass) => {
        try {
            setAwaitingLogin(true);
            setFailedLogin(false);
            const userCredential = await signInWithEmailAndPassword(auth, email, pass);
            const user = userCredential.user;
    
            setUserFunction(user);
            console.log('Logged in as:', user.email);

        } catch (error) {
            setFailedLogin(true);
            console.error("Login failed:", error.message);
        }

        setAwaitingLogin(false);
    
      };

    // allows 'enter' to be hit instead of the Login button - but needs to be tweaked
    //   useEffect(() => {
    //     const handleKeyDown = (e) => {
    //       if (e.key === 'Enter') {
    //         handleLogin(props.setUser, inputEmail, inputPass);
    //       }
    //     };
    
    //     window.addEventListener('keydown', handleKeyDown);
    //     return () => window.removeEventListener('keydown', handleKeyDown);
    //   }, []);

    if (!props.needLogIn) {
        return (
            <div className="LoginWindowContainer">
                <div className="LoginWindow" key='loginwindow'>
                    <label className="LoginWindowLabel">username:</label>
                    <input  className="LoginWindowTextBox" 
                            value={inputEmail} 
                            id="loginwindowusername" 
                            onChange={handleEmailChange}/>
                    <label className="LoginWindowLabel">password:</label>
                    <input  className="LoginWindowTextBox" 
                            value={inputPass} 
                            id="loginwindowpassword" 
                            type='password' 
                            onChange={handlePassChange}/>
                    <LoginWindowButton  LogInFunction={() => handleLogin(props.setUser, inputEmail, inputPass)}
                                        awaitingLogin={awaitingLogin}
                                        buttonText='Log In'/>
                    <div className='LoginWindowWaitingSpinnerContainer' style={awaitingLogin ? {} : {display:'none'}}>
                        <div className='LoginWindowWaitingSpinner' style={awaitingLogin ? {} : {display:'none'}}></div>
                    </div>
                    <label className="LoginFailMessageLabel" style={failedLogin ? {} : {display:'none'}}>Hmm. That didn't work.</label>
                </div>
            </div>
         );
    } 
    
}

const LoginWindowButton = (props) => {

    return (
        <button className="LoginWindowButton" onClick={props.LogInFunction} 
                style={props.awaitingLogin ? {display:'none'} : {}}>
            {props.buttonText}
        </button>
    )
}

export default LoginWindow;