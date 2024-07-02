const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())
var morgan = require('morgan')
// Define custom token for morgan
morgan.token('req-body', (req, res) => JSON.stringify(req.body));
// Setup morgan middleware with custom format
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['req-body'](req, res) // Include request body
  ].join(' ')
}));
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => { 
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p> ${new Date()}</p>`)
    
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  response.json(persons[request.params.id-1])
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  const person = {
    id: (persons.length + 1).toString(),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  response.json(person)
})
app.delete('/api/persons/:id', (request, response) => { 
  persons = persons.filter(person => person.id !== request.params.id)
  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})