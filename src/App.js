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

/*
Current bug: when switching to using obj/dict instead of array for Notes, when creating notes in order,
if all notes have text, deleting the first note that was created deletes all the text for the notes that
were created after it
*/

function genUID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function App() {

  const [data, setData] = useState([])
  const [notes, setNotes] = useState([])
  const [notesObj, setNotesObj] = useState({})

  const [isHoveringNavBar, setIsHoveringNavbar] = useState(false)
  const [isHoveringAnotherNote, setIsHoveringNote] = useState(false)
  const [noteIDToDelete, setIDToBeDeleted] = useState(null)

//#region db stuff
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/data')
  //     .then((response) => response.json())
  //     .then((data) => processDBData(data))
  //     .catch((error) => console.error(error));
  // }, []);

    // function processDBData(dbdata) {
  //   let new_arr = []
  //     dbdata.forEach(d => {
  //       const newNote = <BoardNote 
  //           noteId={d.id} 
  //           noteText={d.text}
  //           notePageX={d.posx}
  //           notePageY={d.posy}
  //           isBeingHovered={setIsHoveringNote}
  //           setIDToBeDeleted={setIDToBeDeleted}
  //           />
  //         new_arr.push(newNote)
  //       })
  //   setNotes(new_arr)
  // }
//#endregion

  const addNoteWithClick = ({pageX, pageY}) => {
    if(!isHoveringAnotherNote && !isHoveringNavBar) {
      addNote(pageX, pageY)
    }
  }

  const addNote = (pageX, pageY) => {
    let newID = genUID()
    const newNoteAttributes = {
      noteId: newID, pageX: pageX, pageY: pageY, isBeingHovered: setIsHoveringNote, setIDToBeDeleted: setIDToBeDeleted
    }
    const newNote = <BoardNote 
          noteId={newID} 
          notePageX={pageX}
          notePageY={pageY}
          isBeingHovered={setIsHoveringNote}
          setIDToBeDeleted={setIDToBeDeleted}
          />
    setNotes([...notes, newNote])
    setNotesObj({...notesObj, [newID]: newNoteAttributes})
  }

  useEffect(() => {
    if(noteIDToDelete in notesObj) {
      delete notesObj[noteIDToDelete]
      setNotesObj(notesObj)
    }
    for(let i = 0; i < notes.length; i++) {
      if(notes[i] !== undefined && notes[i].props.noteId == noteIDToDelete) {
        let new_arr = notes
        delete new_arr[i]
        setNotes(new_arr)
        setIsHoveringNote(false)
        break
      }
    }
  }, [noteIDToDelete])

  const clearAllNotes = () => {
      setNotes([]);
      setNotesObj({})
  }

  return (
    
    <div className="App" onClick={addNoteWithClick}>
      <Navbar navbarAddNote={addNote} navbarClearAll={clearAllNotes} isBeingHovered={setIsHoveringNavbar}></Navbar>
      <Board notes={notes}></Board>
    </div>
  );
}

export default App;
