import { useState } from 'react'

const Navbar = () => {
    return ( 
        <nav className="Navbar">
            <div className="links">
                <NavbarButton buttonText={"Clear All"}/>
                <NavbarButton buttonText={"New Note"}/>
            </div>
        </nav>
     );
}

const NavbarButton = (props) => {

    const handleClick = () => {
        console.log('--')
    }

    return (
        <button className="NavbarButton" onClick={handleClick}>{props.buttonText}</button>
    )
}
 
export default Navbar;