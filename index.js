const express = require('express');
const port = 3000; 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const { body, validationResult } = require('express-validator');

require("dotenv").config();
app.use(bodyParser.json());


mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const Person = mongoose.model('Person', {
  name: String,
  age: Number,
});


const validatePerson = [
  body('name').isString().withMessage('Name must be a string'),
  body('age').isInt().withMessage('Age must be an integer'),
];
// Create a new person
app.post('/api', validatePerson, async (req, res) => {

  const errors = validationResult(req); 
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  

  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

// Get all people
app.get('/api', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a person by ID
app.get('/api/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a person by ID
app.put('/api/:id',validatePerson, async (req, res) => {
  const errors = validationResult(req); 
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const person = await Person.findByIdAndUpdate(req.params.id,{$set: req.body}, { new: true });
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a person by ID
app.delete('/api/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
