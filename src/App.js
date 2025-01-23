import Navbar from './Navbar'
import BoardNote from "./BoardNote"
import Board from './Board'
import SettingsWindow from './SettingsWindow'
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

/* 
TODO: draggable needs to be fixed
3 notes a,b, and c are created in that order. C gets dragged somewhere. If a or b get deleted, c gets moved back to the original spot where it was created
*/
const windowCenterX = (window.innerWidth/2) - 75
const windowCenterY = (window.innerHeight/2) - 50

const placeHolderTextSamples = [':)','B^)',':0',':-)',':D','^_^',':3','O.o']

function genRandomNoteUID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function getRandomIntInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function App() {

  const [notes, setNotes] = useState([])

  const [isHoveringNavBar, setIsHoveringNavbar] = useState(false)
  const [isHoveringAnotherNote, setIsHoveringNote] = useState(false)
  const [noteIDToDelete, setIDToBeDeleted] = useState(null)

  const [settingsWindowVisible, setSettingsVisibility] = useState(false)

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

  const createNoteFromLocalStorage = (noteID, pageX, pageY, noteText) => {
    return <BoardNote 
          key={noteID}
          noteId={noteID} 
          notePageX={pageX}
          notePageY={pageY}
          noteText={noteText}
          isBeingHovered={setIsHoveringNote}
          setIDToBeDeleted={setIDToBeDeleted}
          />
  }

  // populates notes based on localStorage
  useEffect(() => {
    var toAdd = [];
    if(localStorage.length > 0) {
      Object.keys(localStorage).forEach((key) => {
        const note = localStorage.getItem(key);
        
        var pageX = '';
        var pageY = '';

        let ptr = 0;
        while(note[ptr] !== ',') {
          pageX += note[ptr];
          ptr += 1;
        }
        ptr += 1;
        while(note[ptr] !== ',') {
          pageY += note[ptr];
          ptr += 1;
        }
        ptr += 1;

        const newNote = createNoteFromLocalStorage(key, Number(pageX), Number(pageY), note.substring(ptr, note.length)); //TODO: add proper note text in third field
        toAdd.push(newNote);
      })
      setNotes(toAdd);
    }
  }, [])

  const addNote = (pageX, pageY, noteText) => {
    let newID = genRandomNoteUID();
    const newNote = <BoardNote
          key={newID} 
          noteId={newID} 
          notePageX={pageX}
          notePageY={pageY}
          noteText={noteText}
          placeHolderText={placeHolderTextSamples[Math.floor(Math.random()*placeHolderTextSamples.length)]}
          isBeingHovered={setIsHoveringNote}
          setIDToBeDeleted={setIDToBeDeleted}
          />
    setNotes([...notes, newNote]);

    localStorage.setItem(newID, [pageX, pageY, noteText]);
  }

  const addNoteWithClick = ({pageX, pageY}) => {
    if(!isHoveringAnotherNote && !isHoveringNavBar && !settingsWindowVisible) {
      addNote(pageX, pageY, '');
    }
  }

  // checks for and deletes note that was marked for deletion
  useEffect(() => {
    for(let i = 0; i < notes.length; i++) {
      if(noteIDToDelete && notes[i].props.noteId === noteIDToDelete) {
        localStorage.removeItem(noteIDToDelete);
        let new_arr = notes
        new_arr.splice(i,1)
        setNotes(new_arr)
        setIsHoveringNote(false)
        setIDToBeDeleted(null)
        break
      }
    }
  }, [noteIDToDelete, notes])

  const clearAllNotes = () => {
      setNotes([]);
      localStorage.clear();
    }

  const toggleSettingsVisible = () => {
    setSettingsVisibility(!settingsWindowVisible)
  }

  return (
    
    <div className="App" onClick={addNoteWithClick}>
      <Navbar 
        navbarAddNote={() => addNote(windowCenterX + getRandomIntInRange(-200,200),windowCenterY + getRandomIntInRange(-200,200))} 
        navbarClearAll={clearAllNotes} 
        isBeingHovered={setIsHoveringNavbar}
        toggleSettingsVisible={toggleSettingsVisible}
        areSettingsVisible={settingsWindowVisible}/>

      <Board notes={notes}/>

      <SettingsWindow isVisible={settingsWindowVisible} toggleVisible = {toggleSettingsVisible}/>
    </div>
  );
}

export default App;
