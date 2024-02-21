require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Serves up all static and generated assets in in a specified folder.
app.use(express.static(path.join(__dirname, '..','client', 'dist')));

// Other routes here

app.post('/glossary', function(req, res) {
  // Code here
  // console.log('req.body: ', req.body);
  // const { word, definition } = req.body;
  // console.log('word from req.body: ', word);
  // console.log('def from req.body: ', definition);
  db.save(req.body)
    .then(() => {
      return db.Gloss.find({});
    })
    .then((updatedGlossary) => {
      res.status(201).send(updatedGlossary);
    })
    .catch((error) => {
      console.error('Error saving glossary entry:', error);
      res.status(500).send('Error saving glosssary');
    });
});

app.get('/glossary', function(req, res) {
  // Code here
  db.Gloss.find({})
    .then((entries) => {
      res.status(200).send(entries);
    })
    .catch((error) => {
      console.error('Error retrivieving glossary entries:', error);
      res.status(500).send('Internal server error');
    })
});





app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
