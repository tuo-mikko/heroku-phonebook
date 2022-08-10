const { response } = require('express');

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.send('<h1>Hello Phone!</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

app.delete('/api/persons/:id', (req, res) => {
  Person.deleteOne({ _id: req.params.id }).then(res.status(204).end());
});

app.get('/api/info', (req, res) => {
  const date = Date();
  Person.find({}).then((persons) => {
    res.send(
      `<p>Phonebook has info for ${persons.length} persons</p> <p>${date}</p>`
    );
  });
});

app.put('/api/persons/:id', (req, res) => {
  Person.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).then(
    (updatedPerson) => {
      res.json(updatedPerson);
    }
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

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
