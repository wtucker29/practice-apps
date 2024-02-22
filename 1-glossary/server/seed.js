const db = require('./db.js');
const mongoose = require('mongoose');

const initialGlossary = [
  {
    word: 'oxymoron',
    definition: 'a figure of speech that produces an incongruous, seemingly self-contradictory effect'
  },
  {
    word: 'sesquipedalian',
    definition: '(of a word) containing many variables'
  },
  {
    word: 'wyvern',
    definition: 'a two-legged winged dragon having the hinder part of a serpent with a barbed tail'
  },
  {
    word: 'discombobulate',
    definition: 'to confuse or disconcert; confound; bewilder'
  },
  {
    word: 'carte blanche',
    definition: 'unconditional authority; full discretionary power'
  },
  {
    word: 'jalopy',
    definition: 'an old, decrepit, or unpretentious automobile'
  }
];

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return db.Gloss.seed(initialGlossary);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  });