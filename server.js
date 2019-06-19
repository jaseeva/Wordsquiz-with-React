const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./test.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the test database.');
    //createTable();
  });

  // const createTable = () => {
  //   console.log("create database table words");
  //   db.run("CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, word STRING NOT NULL UNIQUE ON CONFLICT ROLLBACK, translation STRING NOT NULL, learned_rating INT DEFAULT (0), last_answered  DATE);)",  insertData);
  // }

  // const insertData = () =>{
  //   console.log("Insert data")
  //   db.run('INSERT INTO words (word, translation) VALUES (?)', ["verstehen", "understand"]);
  // }

  // Root endpoint
  app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
  });

  // get the list of all words
  app.get('/list', function (req, res, next) {
    db.all('SELECT * FROM words', [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json(rows);
    });
  });

  app.get('/quiz', function (req, res, next) {
    //need to select random words which have rating less than median limit 10
    const sql = 'SELECT * FROM words limit 1'
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json(rows);
    });
  });
   
  // db.close((err) => {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   console.log('Close the database connection.');
  // });