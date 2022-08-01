const { response } = require('express');

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

let persons = [
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 1,
  },
  {
    name: 'Andy Warhol',
    number: '044-213-5543',
    id: 2,
  },
  {
    name: 'Marko Miettinen',
    number: '04-05-022232',
    id: 3,
  },
  {
    name: 'Jaakko Läntinen',
    number: '051-231-3341',
    id: 4,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello Phone!</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.get('/api/info', (req, res) => {
  const date = Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} persons</p> <p>${date}</p>`
  );
});

app.post('/api/persons/', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }

  if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({ error: 'This person already exists' });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 5000),
  };

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
