import { useState } from "react"
import BoardNote from "./BoardNote"

const Board = (props) => {

    return ( 
        <div>
            <div className="Board">
                {props.notes.map(note => (
                    note
                ))}
            </div>
        </div>
     );
}

export default Board;