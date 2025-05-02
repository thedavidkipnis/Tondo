/* 
Board component that renders all notes

Authored: David Kipnis, 2024
*/

import '../styles/Board.css'

const Board = (props) => {
    return ( 
        <div>
            <div className="Board" key='board'>
                <InstructionText key = 'instructions' text={"Click to add note..."} toggle={props.notes.length}/>
                {props.notes.map(note => (note))}
            </div>
        </div>
     );
}

const InstructionText = (props) => {
    return (
        <h1 className="InstructionText" style={{opacity: props.toggle ? 0 : 1}}>
            {props.text}
        </h1>
    );
}

export default Board;