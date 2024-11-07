const Navbar = () => {
    return ( 
        <nav className="Navbar">
            <div className="links">
                <NavbarButton buttonText={"Clear All"} buttonFunction={(e) => {handleClick('CA', e)}}/>
                <NavbarButton buttonText={"New Note"} buttonFunction={(e) => {handleClick('NN', e)}}/>
            </div>
        </nav>
     );
}

const NavbarButton = (props) => {
    return (
        <button className="NavbarButton" onClick={props.buttonFunction}>{props.buttonText}</button>
    )
}

const handleClick = (buttonName, e) => {
    console.log(buttonName)
}
 
export default Navbar;