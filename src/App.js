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

function genUID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function App() {

  const [notes, setNotes] = useState([])
  const [isHoveringAnotherNote, setIsHoveringElement] = useState(false)

  const [data, setData] = useState([])

  const addNote = (pageX, pageY) => {
    let newID = genUID()
    const newNote = <BoardNote 
          noteId={newID} 
          noteText={newID.toString()}
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

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
      console.log(data);
  }, []);

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
