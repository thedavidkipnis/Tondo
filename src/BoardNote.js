
const BoardNote = (props) => {

    const id = props.noteId
    const text = props.noteText

    return (
        <div className="BoardNote" key={id}>
            {text}
        </div>
    );
}
 
export default BoardNote;