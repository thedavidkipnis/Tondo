
const BoardNote = (props) => {

    const id = props.noteId
    const text = props.noteText
    const locationX = props.notePageX - 20
    const locationY = props.notePageY * 1.9
    const st = {marginLeft:locationX, marginTop:locationY}

    return (
        <div className="BoardNote" 
                key={id} style={st} 
                onMouseEnter={() => props.isBeingHovered(true)}
                onMouseLeave={() => props.isBeingHovered(false)}
                >
            <div className="BoardNoteCloseMarkerContainer">
                <div style={{width: '85%'}}></div>
                <div className="BoardNoteCloseMarker"
                    onClick={() => props.setIDToBeDeleted(id)}>X</div>
            </div>
            
            <textarea type="text" className="BoardNoteTextBox" placeholder="Todo..." autoFocus/>
        </div>
    );


}
 
export default BoardNote;