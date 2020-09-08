// Imports
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')


const app = express()
app.use(express.json())
app.use(cors())
morgan.token('person', (req, res) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"))


app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people</br></br>${new Date()}`)
})

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body
    if (!name || !number) {
        return res.status(400).send({ error: "Missing information" })
    }

    const duplicate = persons.find(person => person.name === name)
    if (duplicate) {
        return res.status(400).send({ error: "Name must be unique" })
    }

    const person = {
        id: Math.floor((Math.random() * 100) + 4),
        name,
        number
    }

    persons = persons.concat(person)
    res.status(201).end()
})

app.get('/api/persons', (req, res) => {
    res.send(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person)
        res.send(person)
    else
        res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.use((req, res, next) => {
    res.status(400).send({ error: "unknown end point" })
})



let persons = [
    {
        id: 1,
        name: "Ahmed Usama",
        number: "01119784561"
    },
    {
        id: 2,
        name: "Ahmed Badry",
        number: "01001101111"
    },
    {
        id: 3,
        name: "Bassem Mohamed",
        number: "01501011566"
    },
]

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
