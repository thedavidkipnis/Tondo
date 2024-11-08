import { useState } from "react"

const Board = () => {

    const [nextId, setId] = useState(1)

    const [notes, setNotes] = useState([])

    const addNote = () => {
        const newNote = <BoardNote noteId={nextId} noteText={'Note ' + nextId.toString()}/>
        setId(nextId + 1)
        setNotes([...notes, newNote])
    }

    const clearAllNotes = () => {
        setId(1)
        setNotes([])
    }

    return ( 
        <div>
            <div className="Board">
                {notes.map(note => (
                    note
                ))}
            </div>
            <button onClick={addNote}> 
                ADD NOTE
            </button>
            <button onClick={clearAllNotes}> 
                CLEAR ALL
            </button>
        </div>
     );
}

const BoardNote = (props) => {

    const id = props.noteId
    const text = props.noteText

    return (
        <div className="BoardNote" key={id}>
            {text}
        </div>
    );
}
 
export default Board;