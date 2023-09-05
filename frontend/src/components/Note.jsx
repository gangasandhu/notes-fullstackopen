const Note = ({ note, toggleImportance }) => {
  return (
    <li>
    {note.content}
    <button onClick={toggleImportance}>{note.important ? '⭐' : '★'}</button></li>
  )
}

export default Note