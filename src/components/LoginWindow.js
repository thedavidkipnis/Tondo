/* 
Login Window component that renders login window

Authored: David Kipnis, 2025
*/

import '../styles/LoginWindow.css'

const LoginWindow = (props) => {
    if (!props.needLogIn) {
        return (
            <div className="LoginWindowContainer">
                <div className="LoginWindow" key='loginwindow'>
                    <label className="LoginWindowLabel">username:</label>
                    <input className="LoginWindowTextBox" id="loginwindowusername"></input>
                    <label className="LoginWindowLabel">password:</label>
                    <input className="LoginWindowTextBox" id="loginwindowpassword" type='password'></input>
                    <LoginWindowButton buttonFunction={props.buttonFunction} buttonText='Log In'/>
                </div>
            </div>
         );
    } 
    
}

const LoginWindowButton = (props) => {

    return (
        <button className="LoginWindowButton" onClick={() => props.buttonFunction('TEST LOG INxxx')}>
            {props.buttonText}
        </button>
    )
}

export default LoginWindow;