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

  db.Gloss.find({})
    .then((entries) => {
      res.status(200).send(entries);
    })
    .catch((error) => {
      console.error('Error retrivieving glossary entries:', error);
      res.status(500).send('Internal server error');
    });
});

// app.get('/glossary/:word', function(req, res) {
//   // something
//   const searchedWord = req.params.word;
//   console.log('searchedWord:', searchedWord);
//   const searchQuery = { word: searchedWord }
//   console.log('searchQuery: ', searchQuery);
//   db.Gloss.find(searchQuery)
//     .then((glossaryEntry) => {
//       console.log(glossaryEntry);
//       res.status(200).send(glossaryEntry);
//     })
//     .catch((error) => {
//       console.error('Error retrieving searched word:', error);
//       res.status(500).send('Internal server error');
//     });
// });

app.put('/glossary/:word', function(req, res) {
  // something
  const wordToUpdate = req.params.word;
  const updatedData = req.body;
  db.Gloss.findOneAndUpdate({ word: wordToUpdate }, updatedData, { new: true })
    .then((updatedGlossary) => {
      return res.status(200).send(updatedGlossary);
    })
    .catch((error) => {
      console.error('Error updating glossary entry:', error);
      res.status(500).send('Internal server error');
    });
});

app.delete('/glossary', function(req, res) {

  const deleteWord = req.body.word;
  const deleteDef = req.body.definition;

  db.Gloss.deleteOne({ word: deleteWord, definition: deleteDef })
    .then(() => {
      return db.Gloss.find({})
    })
    .then((updatedGlossary) => {
      res.status(200).send(updatedGlossary);
    })
    .catch((error) => {
      console.error('Error deleting glossary entry:', error);
      res.status(500).send('Internal server error');
    });
});





app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
