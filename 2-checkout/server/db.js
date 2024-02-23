require("dotenv").config();
const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.connectAsync()
  .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
  .then(() =>
    db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
  )
  .then(() =>
    db.queryAsync(`USE ${process.env.DB_NAME}`)
  )
  .then(() =>
    // Expand this table definition as needed:
    db.queryAsync(
      "CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, sessionid VARCHAR(200) NOT NULL, name TEXT NOT NULL, email VARCHAR(50) NOT NULL, password VARCHAR(20) NOT NULL, addressline1 VARCHAR(50), addressline2 VARCHAR(50), city TEXT, state CHAR(2), zipcode BIGINT, creditcardnumber BIGINT, expirydate VARCHAR(7), cvv INT, billingzip BIGINT)"
    )
  )
  .catch((err) => console.log(err));

const getInfo = (sessionid, callback) => {
  const getInfoQuery = 'SELECT * FROM responses WHERE sessionid = ?';
  db.queryAsync(getInfoQuery, [sessionid])
    .then((result) => {
      console.log('result within getInfo: ', result[0]);
      callback(null, result[0]);
    })
    .catch((error) => {
      callback(error, null);
    });
}

const postInfo = (data, callback) => {
  const { sessionid, name, email, password } = data;
  const postInfoQuery = 'INSERT INTO responses (sessionid, name, email, password, addressline1, addressline2, city, state, zipcode, creditcardnumber, expirydate, cvv, billingzip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  console.log('PostInfoQuery: ', postInfoQuery);
  db.queryAsync(postInfoQuery, [sessionid, name, email, password, null, null, null, null, null, null, null, null, null])
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      console.log('error happened:', error);
      callback(error, null);
    });
}

const putInfo = (sessionid, data, callback) => {
  console.log('data in putInfo function: ', data);
  if (data.city !== undefined) {
    const { addressline1, addressline2, city, state, zipcode } = data;
    const putInfoQuery = 'UPDATE responses SET addressline1 = ?, addressline2 = ?, city = ?, state = ?, zipcode = ? WHERE sessionid = ?';
    db.queryAsync(putInfoQuery, [addressline1, addressline2, city, state, zipcode, sessionid])
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        console.log('Error in put request:', error);
        callback(error, null);
      });
  } else {
    const { creditcardnumber, expirydate, cvv, billingzip } = data;
    const putInfoQuery = 'UPDATE responses SET creditcardnumber = ?, expirydate = ?, cvv = ?, billingzip = ? WHERE sessionid = ?';
    db.queryAsync(putInfoQuery, [creditcardnumber, expirydate, cvv, billingzip, sessionid])
      .then((result) => {
        callback(null, result);
      })
      .catch((error) => {
        console.log('Error in put request: ', error);
        callback(error, null);
      });
  }
}

module.exports.db = db;
module.exports.getInfo = getInfo;
module.exports.postInfo = postInfo;
module.exports.putInfo = putInfo;
