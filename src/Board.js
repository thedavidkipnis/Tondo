import { useState } from "react"
import BoardNote from "./BoardNote"

const Board = (props) => {

    return ( 
        <div>
            <div className="Board">
                {/* {Object.values(props.notes).map(note => (note))} */}
                {props.notes.map(note => (note))}
            </div>
        </div>
     );
}

export default Board;