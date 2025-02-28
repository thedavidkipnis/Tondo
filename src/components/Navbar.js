
const Navbar = (props) => {

    return ( 
        <nav className="Navbar" onMouseEnter={() => props.isBeingHovered(true)} onMouseLeave={() => props.isBeingHovered(false)}>
            <div className="NavbarLeftHalfButtons">
                {/* <NavbarButton buttonText={"Settings"} buttonFunction={props.toggleSettingsVisible}/> */}
                <NavbarButton buttonText={"Save"} buttonFunction={props.navbarSaveData} isVisible={true}/>
            </div>
            <div className="NavbarRightHalfButtons">
                <NavbarButton buttonText={"Undo"} buttonFunction={props.navbarProcessUndoStack} isVisible={props.navbarUndoStack.length > 0}/>
                <NavbarButton buttonText={"Clear All"} buttonFunction={props.navbarClearAll} isVisible={true}/>
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