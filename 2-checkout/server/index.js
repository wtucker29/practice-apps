require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler.js");
const logger = require("./middleware/logger.js");

// Establishes connection to the database on server start
const { db, getInfo, postInfo, putInfo } = require("./db");

const app = express();
app.use(express.json());

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

// Serves up all static and generated assets in a specified folder.
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

/****
 *
 *
 * Other routes here....
 *
 *
 */

app.get('/checkout', function(req, res) {

  const sessionid = req.session_id;
  console.log(sessionid);
  getInfo(sessionid, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving checkout information');
      return;
    }
    res.status(200).send(result);
  })
});

app.post('/checkout', function(req, res) {

  const sessionid = req.session_id;
  const { name, email, password } = req.body;
  const accountData = { sessionid, name, email, password };
  postInfo(accountData, (err, result) => {
    if (err) {
      res.status(500).send('Error sending information');
      return;
    }
    res.status(201).send(result);
  });

});

app.put('/checkout', function(req, res) {
  // hardcoding sessionid for postman tests
  const sessionid = req.session_id;
  console.log('sessionid in server put request: ', sessionid);
  putInfo(sessionid, req.body, (err, result) => {
    if (err) {
      res.status(500).send('Error updating information');
      return;
    }
    res.status(201).send(result);
  })
});

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
