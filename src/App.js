import Navbar from './Navbar'
import BoardNote from "./BoardNote"
import Board from './Board'
import { useState } from "react"

/*
To install react: Install node.js, run npx create-react-app tts in cmd
To open VSCode in a directory from cmd: navigate to directory, run "code ."
If node_modules is missing: run "install npm", this will look at the package.json folder and install everything from the dependencies

Core functionality:
- add a sticky (either by clicking on screen or + button on nav bar)
- erase all (nav bar) (with confirmation, i.e. "are you sure you want to delete all your notes?")

*/


function App() {

  const [notes, setNotes] = useState([])
  const [isHoveringAnotherNote, setIsHoveringElement] = useState(false)

  const addNote = (pageX, pageY) => {
    let nextId = notes.length + 1
    const newNote = <BoardNote noteId={nextId} 
          noteText={'Note ' + nextId.toString()}
          notePageX={pageX}
          notePageY={pageY}
          isBeingHovered={setIsHoveringElement}
          />
    setNotes([...notes, newNote])
  }

  const clearAllNotes = () => {
      setNotes([]);
  }

  const addNoteWithClick = ({pageX, pageY}) => {
    if(!isHoveringAnotherNote) {
      if(pageY > 100) {
        addNote(pageX, pageY)
      }
    }
  }

  return (
    
    <div className="App" onClick={addNoteWithClick}>
      <Navbar navbarAddNote={addNote} navbarClearAll={clearAllNotes}></Navbar>
      <Board notes={notes}></Board>
    </div>
  );
}

export default App;
