import InstructionText from "./InstructionText";

const Board = (props) => {
    return ( 
        <div>
            <div className="Board">
                <InstructionText text={"Click anywhere to add note..."} toggle={props.notes.length}/>
                {props.notes.map(note => (note))}
            </div>
        </div>
     );
}

export default Board;