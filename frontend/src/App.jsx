import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const App = (props) => {
  const [note, setNote] = useState("")
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    noteService
      .getAll()
      .then(notesData => {
        setNotes(notesData)
      })
  }, [])

  function handleChange(e) {
    const value = e.target.value;
    setNote(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const noteObject = {
      content: note,
      important: Math.random() > 0.5
    }
    noteService
      .create(noteObject)
      .then(newNote => {
        setNotes(prevNote => [...prevNote, newNote])
        setNote('')
      })

  }

  const handleClick = () => {
    setShowAll(prevValue => !prevValue)
  }

  const toggleImportance = (id) => {
    console.log("toggle importance " + id)
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const updatedNote = { ...note, important: !note.important }

    noteService
      .update(id, updatedNote)
      .then(changedNote => {
        setNotes(notes.map(n => n.id === id ? changedNote : n))
      })
      .catch(error => {
        alert(
          `the note '${note.content}' was already deleted from server`
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleClick}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>

        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} />
        )}
      </ul>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={note} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App 