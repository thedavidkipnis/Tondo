/* 
Board component that renders all notes

Authored: David Kipnis, 2024
*/

import InstructionText from "./InstructionText";

const Board = (props) => {
    return ( 
        <div>
            <div className="Board" key='board'>
                <InstructionText key = 'instructions' text={"Click anywhere to add note..."} toggle={props.notes.length}/>
                {props.notes.map(note => (note))}
            </div>
        </div>
     );
}

export default Board;