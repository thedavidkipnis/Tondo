import { useState } from "react"
import BoardNote from "./BoardNote"

const Board = (props) => {
    return ( 
        <div>
            <div className="Board">
                {props.notes.map(note => (note))}
                {/* {Object.keys(props.notes).map((key) => 
                    <BoardNote 
                        noteId={props.notes[key].noteId}
                        notePageX={props.notes[key].pageX}
                        notePageY={props.notes[key].pageY}
                        isBeingHovered={props.notes[key].isBeingHovered}
                        setIDToBeDeleted={props.notes[key].setIDToBeDeleted}
                    />
                )} */}
            </div>
        </div>
     );
}

export default Board;