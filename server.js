const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())

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

  function countMedian (arr) {
    let median;
    let i;
    if ((arr.length % 2) === 1) {
      i = Math.floor(arr.length / 2)
      return median = arr[i]
    } else { 
      i = (arr[arr.length / 2] + arr[arr.length / 2 + 1]) / 2 - 1
      return median = i
    }
  }

  app.get('/quiz', function (req, res, next) {
    //need to select random words which have rating less than median limit 10
    let rates = []
    const sql_m = "SELECT learned_rating from words GROUP BY learned_rating ORDER BY learned_rating ASC"
    db.all(sql_m, [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      rows.forEach(el => {
        rates.push(el.learned_rating)
      })
      median = countMedian(rates)
      //console.log(`median: `, median)
      const sql = "SELECT * FROM words WHERE learned_rating <= "+median+" ORDER BY random() limit 5"
      db.all(sql, [], (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(rows);
      });
    });
  });

  app.patch('/results', function (req, res, next) {
    var data = {
      id: req.body.el.id,
      correct: req.body.el.correct,
    }
    var rate = 0
    if (data.correct == true) {rate = 1}
    var sql ='UPDATE words SET last_answered=DATETIME("now"), learned_rating=learned_rating+? WHERE id=?'
    var params =[rate, data.id]
    db.run(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
        message: "data updated"
      });
    });
  });
   
  // db.close((err) => {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   console.log('Close the database connection.');
  // });