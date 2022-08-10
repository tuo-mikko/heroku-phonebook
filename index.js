const { response } = require('express');

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello Phone!</h1>');
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (req, res) => {
  Person.deleteOne({ _id: req.params.id })
    .then(res.status(204).end())
    .catch((error) => next(error));
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
  Person.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.post('/api/persons/', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
