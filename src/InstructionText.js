

const InstructionText = (props) => {
    return (
        <h1 className="InstructionText" hidden={props.toggle}>
            {props.text}
        </h1>
    );
}

export default InstructionText;