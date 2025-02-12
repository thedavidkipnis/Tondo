/* 
Instruction text that appears only when there are no notes on the screen

Authored: David Kipnis, 2024
*/

const InstructionText = (props) => {
    return (
        <h1 className="InstructionText" hidden={props.toggle}>
            {props.text}
        </h1>
    );
}

export default InstructionText;