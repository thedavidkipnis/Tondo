import Navbar from './Navbar'
import BoardNote from "./BoardNote"
import Board from './Board'
import { useEffect, useState } from "react"

/*
To install react: Install node.js, run npx create-react-app tts in cmd
To open VSCode in a directory from cmd: navigate to directory, run "code ."
If node_modules is missing: run "install npm", this will look at the package.json folder and install everything from the dependencies

Core functionality:
- add a sticky (either by clicking on screen or + button on nav bar)
- erase all (nav bar) (with confirmation, i.e. "are you sure you want to delete all your notes?")

- current Postgres + React tutorial
- https://blog.logrocket.com/getting-started-postgres-react-app/
*/


/* HOW TO DELETE NOTE: create a useState variable here in App.js, something like toDelete
pass each new note the useState function, and have the note use the function like so:
setToDelete(noteID)

This way App will know which ID needs to be removed, and can then update the list and remove the note
with the particular ID
*/

function genUID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function App() {

  const [data, setData] = useState([])
  const [notes, setNotes] = useState([])

  const [isHoveringAnotherNote, setIsHoveringElement] = useState(false)
  const [noteIDToDelete, setIDToBeDeleted] = useState(null)

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/data')
  //     .then((response) => response.json())
  //     .then((data) => processDBData(data))
  //     .catch((error) => console.error(error));
  // }, []);

  useEffect(() => { // TODO: refactor to use a dict/obj instead of array for notes
    if(noteIDToDelete !== null) {
      for(let i = 0; i < notes.length; i++) {
        if(notes[i].props.noteId == noteIDToDelete) {
          delete notes[i]
          setNotes(notes)
          setIDToBeDeleted(null)
          break
        }
      }
    }
  }, [noteIDToDelete])

  function processDBData(dbdata) {
    let new_arr = []
      dbdata.forEach(d => {
        const newNote = <BoardNote 
            noteId={d.id} 
            noteText={d.text}
            notePageX={d.posx}
            notePageY={d.posy}
            isBeingHovered={setIsHoveringElement}
            setIDToBeDeleted={setIDToBeDeleted}
            />
          new_arr.push(newNote)
        })
    setNotes(new_arr)
  }

  const addNote = (pageX, pageY) => {
    let newID = genUID()
    const newNote = <BoardNote 
          noteId={newID} 
          noteText={newID.toString()}
          notePageX={pageX}
          notePageY={pageY}
          isBeingHovered={setIsHoveringElement}
          setIDToBeDeleted={setIDToBeDeleted}
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
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.id}</li>
        ))}
      </ul>
      <Board notes={notes}></Board>
    </div>
  );
}

export default App;
