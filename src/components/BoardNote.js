/* 
BoardNote component that represents a single note in the app

Authored: David Kipnis, 2024
*/

import { useState, useEffect, useRef } from "react"

const BoardNote = (props) => {

    const id = props.noteId

    const [noteText, setNoteText] = useState(props.noteText)
    const [noteCloseMarkerIcon, setNoteCloseMarkerIcon] = useState('●')

    const [position, setPosition] = useState({
        x: Number(props.notePageX) || 100,
        y: Number(props.notePageY) || 100,
      });

    // refs used for calculating note position and drag state
    const noteRef = useRef(null);   // references the note
    const draggingRef = useRef(false); // checks if currently dragging
    const offsetRef = useRef({ x: 0, y: 0 });   // offset from the top left of the note to avoid snapping

    // checking if mouse is down on the note
    const handleMouseDown = (e) => {
        draggingRef.current = true;
        props.isBeingDragged(true);

        const rect = noteRef.current.getBoundingClientRect();
        offsetRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    // checks if mouse is moving while dragging
    const handleMouseMove = (e) => {
        if (!draggingRef.current) return;

        const newX = e.clientX - offsetRef.current.x;
        const newY = e.clientY - offsetRef.current.y;

        setPosition({ x: newX, y: newY });
    };
    
    // checks when mouse is lifted off the note
    const handleMouseUp = () => {
        draggingRef.current = false;
        props.isBeingDragged(false);

        localStorage.setItem(props.noteId, [
            noteRef.current.getBoundingClientRect().left, 
            noteRef.current.getBoundingClientRect().top, 
            noteText]);

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    // check for text change
    const handleInputChange = (event) => {
        setNoteText(event.target.value)
      }

      useEffect(() => {
        localStorage.setItem(props.noteId, [position.x, position.y, noteText]);
    }, [noteText])

    return (
        <div className="BoardNote" ref={noteRef} key={props.noteId}
                onMouseDown={handleMouseDown}
                onMouseEnter={() => props.isBeingHovered(true)}
                onMouseLeave={() => props.isBeingHovered(false)}
                style={{
                    left: position.x,
                    top: position.y,
                    userSelect: "none",
                }}>
            <div className="BoardNoteCloseMarkerContainer">
                <div style={{width: '89%'}}></div>
                <div className="BoardNoteCloseMarker"
                    onClick={() => props.setIDToBeDeleted(id)}
                    onMouseEnter={() => setNoteCloseMarkerIcon('x')}
                    onMouseLeave={() => setNoteCloseMarkerIcon('●')}
                    >
                        {noteCloseMarkerIcon}
                </div>
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
    );


}
 
export default BoardNote;