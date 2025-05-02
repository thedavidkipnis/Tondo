/* 
Navbar component that contains buttons for interacting with the application

Authored: David Kipnis, 2024
*/

import '../styles/Navbar.css'

const Navbar = (props) => {

    return ( 
        <nav className="Navbar" style={props.isUserLoggedIn ? {} : {display:'none'}}
            onMouseEnter={() => props.isBeingHovered(true)} 
            onMouseLeave={() => props.isBeingHovered(false)}>
            <div className="NavbarLeftHalfButtons">
                {/* <NavbarButton buttonText={"Settings"} buttonFunction={props.toggleSettingsVisible}/> */}
            </div>
            <div className="NavbarRightHalfButtons">
                <NavbarButton buttonText={"Undo"} buttonFunction={props.navbarProcessUndoStack} isVisible={props.navbarUndoStack.length > 0}/>
                <NavbarButton buttonText={"Clear All"} buttonFunction={props.navbarClearAll} isVisible={true}/>
                <NavbarButton buttonText={"New Note"} buttonFunction={props.navbarAddNote} isVisible={true}/>
            </div>
        </nav>
     );
}

const NavbarButton = (props) => {

    return (
        <button className="NavbarButton" onClick={props.buttonFunction} hidden={!props.isVisible}>
            {props.buttonText}
        </button>
    )
}
 
export default Navbar;