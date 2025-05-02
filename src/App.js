/* 
A React web application that acts as a board of sticky notes for writing down ideas or todo's

Authored: David Kipnis, 2024
*/

import { Navbar, BoardNote, Board, SettingsWindow, MobileSupport, LoginWindow } from './/components';
import { useEffect, useState } from "react"
import * as hp from "./helpers"

const windowCenterX = (window.innerWidth/2) - 75;
const windowCenterY = (window.innerHeight/2) - 50;

const undoStack = [];

const placeHolderTextSamples = [':)','B^)',':0',':-)',':D','^_^',':3','O.o']

function App() {

  const [userLogIn, setUserLogIn] = useState('temp') // set back to NULL when developing further

  const [notes, setNotes] = useState([])

  const [isHoveringNavBar, setIsHoveringNavbar] = useState(false)
  const [isHoveringAnotherNote, setIsHoveringNote] = useState(false)
  const [isNoteBeingDragged, setIsNoteBeingDragged] = useState(false)

  const [noteIDToDelete, setIDToBeDeleted] = useState(null)

  const [settingsWindowVisible, setSettingsVisibility] = useState(false)

  // creates a BoardNote component
  const createNoteFromLocalStorage = (noteID, pageX, pageY, noteText) => {
    return <BoardNote 
          key={noteID}
          noteId={noteID} 
          notePageX={pageX}
          notePageY={pageY}
          noteText={noteText}
          isBeingHovered={setIsHoveringNote}
          isBeingDragged={setIsNoteBeingDragged}
          setIDToBeDeleted={setIDToBeDeleted}
          />
  }

  // populates notes from what is found in localStorage
  useEffect(() => {
    var toAdd = [];
    if(localStorage.length > 0) {
      Object.keys(localStorage).forEach((key) => {
        const note = localStorage.getItem(key);
        
        let noteData = hp.processLocalStorageEntry(note)

        const newNote = createNoteFromLocalStorage(key, noteData[0], noteData[1], noteData[2]);
        toAdd.push(newNote);
      })
      setNotes(toAdd);
    }
  }, [])

  // adds note to the current note list and updates local storage
  const addNote = (noteID, pageX, pageY, noteText) => {
    let newID = ''
    if(noteID) {
      newID = noteID
    } else {
      newID = hp.genRandomNoteUID();
    }
    const newNote = <BoardNote
          key={newID} 
          noteId={newID} 
          notePageX={pageX-75}
          notePageY={pageY-15}
          noteText={noteText}
          placeHolderText={placeHolderTextSamples[Math.floor(Math.random()*placeHolderTextSamples.length)]}
          isBeingHovered={setIsHoveringNote}
          isBeingDragged={setIsNoteBeingDragged}
          setIDToBeDeleted={setIDToBeDeleted}
          />
          
    setNotes([...notes, newNote]);
    localStorage.setItem(newID, [pageX, pageY, noteText]);
    
  }

  // used by navbar button to add note with a click
  const addNoteWithClick = ({pageX, pageY}) => {
    if(userLogIn != null && !isHoveringAnotherNote && !isNoteBeingDragged && !isHoveringNavBar && !settingsWindowVisible) {
      addNote(null, pageX, pageY, '');
      console.log(userLogIn);
    }
  }

  // checks for and deletes note that was marked for deletion
  useEffect(() => {
    for(let i = 0; i < notes.length; i++) {
      if(noteIDToDelete && notes[i].props.noteId === noteIDToDelete) {

        undoStack.push(['-', [noteIDToDelete, localStorage.getItem(noteIDToDelete)].join(",")])

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
    if(notes.length < 1) {
      return;
    }  

    undoStack.push(['//', '']) // stack blocker to handle back to back 'clear all' calls
    Object.keys(localStorage).forEach((key) => {
      undoStack.push(['--', key + ',' + localStorage.getItem(key)]);
    })

    setNotes([]);
    localStorage.clear();
  }

  // checks the undoStack for actions and processes them based on top action
  const processUndoStack = () => {
    
    if(undoStack.length < 1) {
      return;
    }

    let stackElement = undoStack.pop()
    let action = stackElement[0]
    let note = stackElement[1]

    switch(action) {
      case '-': // one note was deleted

        let noteID = '';

        let ptr = 0;
        while(note[ptr] !== ',') { //get ID
          noteID += note[ptr];
          ptr ++;
        }
        ptr++;
        
        let noteData = hp.processLocalStorageEntry(note.substring(ptr, note.length)) // get X, Y, note text

        addNote(noteID, noteData[0], noteData[1], noteData[2]);

        break;
      case '--': // clear all was called
        let toAdd = []       
        while(action === '--') {

          let noteID = '';

          let ptr = 0;
          while(note[ptr] !== ',') { //get ID
            noteID += note[ptr];
            ptr ++;
          }
          ptr++;
          
          let noteData = hp.processLocalStorageEntry(note.substring(ptr, note.length)) // get X, Y, note text

          let newNote = createNoteFromLocalStorage(noteID, noteData[0], noteData[1], noteData[2]);
          toAdd.push(newNote);

          stackElement = undoStack.pop()
          action = stackElement[0]
          note = stackElement[1]
        }
        
        setNotes(notes.concat(toAdd))

        break;
      default:
        break;
    }
  }

  const toggleSettingsVisible = () => {
    setSettingsVisibility(!settingsWindowVisible)
  }

  return (
    <div className="App" onClick={addNoteWithClick}>
    <LoginWindow buttonFunction={setUserLogIn} needLogIn={userLogIn != null}/>
    <div className="BlurScreen" style={userLogIn ? {filter:'blur(0px)'} : {}}>
      <div className='AppContent' style={userLogIn ? {backgroundColor:'white'} : {}}>
        <Navbar
          isUserLoggedIn={userLogIn}
          navbarProcessUndoStack={processUndoStack}
          navbarUndoStack={undoStack}
          navbarAddNote={() => addNote(null, windowCenterX + hp.getRandomIntInRange(-200,200),windowCenterY + hp.getRandomIntInRange(-200,200))} 
          navbarClearAll={clearAllNotes} 
          isBeingHovered={setIsHoveringNavbar}
          toggleSettingsVisible={toggleSettingsVisible}
          areSettingsVisible={settingsWindowVisible}/>

        <Board notes={notes}/>

        <SettingsWindow isVisible={settingsWindowVisible} toggleVisible = {toggleSettingsVisible}/>
      </div>
      </div>
      <MobileSupport />
    </div>
  );
}

export default App;
