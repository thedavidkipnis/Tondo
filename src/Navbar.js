import { useState } from 'react'
import Board from './Board'

const Navbar = (props) => {

    return ( 
        <nav className="Navbar">
            <div className="links">
                <NavbarButton buttonText={"Clear All"} buttonFunction={props.navbarClearAll}/>
                <NavbarButton buttonText={"New Note"} buttonFunction={props.navbarAddNote}/>
            </div>
        </nav>
     );
}

const NavbarButton = (props) => {

    return (
        <button className="NavbarButton" onClick={props.buttonFunction}>{props.buttonText}</button>
    )
}
 
export default Navbar;