/* 
BoardNote component that represents a single note in the app

Authored: David Kipnis, 2024
*/

import { useState, useEffect } from "react"
// import Draggable from 'react-draggable'

const BoardNote = (props) => {

    const id = props.noteId
    const locationX = props.notePageX - 50
    const locationY = props.notePageY - 20
    const st = {left:locationX, top:locationY}

    const [noteText, setNoteText] = useState(props.noteText)

    const handleInputChange = (event) => {
        setNoteText(event.target.value)
      }

    useEffect(() => {
        localStorage.setItem(props.noteId, [props.notePageX, props.notePageY, noteText])
    }, [noteText])

    return (
        // <Draggable>
        <div className="BoardNote"
                key={props.noteId} style={st} 
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
                placeholder={props.placeHolderText}
                autoFocus 
            />
        </div>
        // </Draggable>
    );


}
 
export default BoardNote;