
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
            <textarea type="text" className="BoardNoteTextBox"/>
        </div>
    );


}
 
export default BoardNote;