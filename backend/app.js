const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "important": true,
        "importance": false
    },
    {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "important": true
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
    },
    {
        "content": "new note",
        "important": true,
        "id": 4
    },
    {
        "content": "this is my second new note",
        "important": false,
        "id": 5
    },
    {
        "content": "this is a new note",
        "important": false,
        "id": 6
    },
    {
        "content": "this is fullstack open course",
        "important": true,
        "id": 7
    },
    {
        "content": "this course is awesome",
        "important": true,
        "id": 8
    }
]

app.get('/', (req, res) => {
    res.send("<h1>Hello world</h1>")
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find(note => note.id === id)
    if (note) {
        res.json(note);
    } else {
        res.status(402).end();
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);

    notes = notes.filter(note => note.id !== id)

    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const note = req.body

    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
    console.log(maxId)
    note.id = maxId + 1

    notes = [...notes, note]

    res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("server started successfully")
})