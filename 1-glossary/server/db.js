const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
console.log(`mongodb://localhost/${process.env.DB_NAME}`);
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

// 2. Set up any schema and models needed by the app
let glossSchema = mongoose.Schema({
  word: String,
  definition: String
});

let Gloss = mongoose.model('Gloss', glossSchema);

// Save function to save glossary information to mongoDB
let save = (glossaryData) => {
  // return Promise.all(glossaryData.map(glossary => {
  //   return new Gloss(glossary).save();
  // }))
  return new Gloss(glossaryData).save();
}

// 3. Export the models
module.exports.Gloss = Gloss;
module.exports.save = save;

// 4. Import the models into any modules that need them
