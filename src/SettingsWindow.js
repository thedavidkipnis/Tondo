
const SettingsWindow = (props) => {

    return (
       <div className="SettingsWindowContainer" hidden={!props.isVisible}>
        <div className="BoardNoteCloseMarkerContainer">
                <div style={{width: '85%'}}></div>
                <div className="BoardNoteCloseMarker"
                    onClick={props.toggleVisible}>X</div>
            </div>
        SETTINGS
       </div> 
       );
}

export default SettingsWindow;