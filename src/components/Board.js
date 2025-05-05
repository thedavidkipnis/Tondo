/* 
Board component that renders all notes

Authored: David Kipnis, 2024
*/

import '../styles/Board.css'

const Board = (props) => {
    return ( 
        <div>
            <div className="Board" key='board'>
                <InstructionText key = 'instructions' text={"Click to add note..."} toggle={props.notes.length} isWaitingForNotes={props.isWaitingForNotes}/>
                {props.notes.map(note => (note))}
            </div>
        </div>
     );
}

const InstructionText = (props) => {
    return (
        <div>
            <h1 className="InstructionText" style={{opacity: props.toggle ? 0 : 1, display: props.isWaitingForNotes ? 'none' : 'flex'}}>
                {props.text}
            </h1>
            <div className='WaitingSpinnerContainer' style={{display: props.isWaitingForNotes ? 'flex' : 'none'}}>
                <div className='WaitingSpinner'></div>
                <label className='WaitingSpinnerLabel'>Loading your notes...</label>
            </div>
        </div>
    );
}

export default Board;