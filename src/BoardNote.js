import { useState } from "react"
import Draggable from 'react-draggable'
import InstructionText from "./InstructionText"

const BoardNote = (props) => {

    const id = props.noteId
    const locationX = props.notePageX - 75
    const locationY = props.notePageY - 80
    const st = {marginLeft:locationX, marginTop:locationY}

    const [noteText, setNoteText] = useState('')

    const handleInputChange = (event) => {
        setNoteText(event.target.value)
      }

    return (
        // <Draggable>
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
            
            <textarea 
                value = {noteText} 
                onChange={handleInputChange}
                type="text" 
                className="BoardNoteTextBox" 
                placeholder="Todo..." 
                autoFocus 
            />
        </div>
        // </Draggable>
    );


}
 
export default BoardNote;