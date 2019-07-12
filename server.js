const express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
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

  app.get("/last_quiz", (req, res, next) => {
    db.all('SELECT * FROM history ORDER BY quiz_id DESC LIMIT 1;', [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json(rows);
    });
  })

  app.get("/quiz_history", (req, res, next) => {
    sql = 'SELECT * FROM (SELECT * FROM history ORDER BY quiz_id DESC LIMIT 10) ORDER BY quiz_id ASC;'
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json(rows);
    });
  })

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
    //console.log(`arr: `, arr)
    if ((arr.length % 2) === 1) {
      i = Math.floor(arr.length / 2)
      return median = arr[i]
    } else { 
      return median = (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2
    }
  }

  app.get('/quiz', function (req, res, next) {
    //need to select random words which have rating less than median
    let rates = []
    const sql_m = "SELECT learned_rating from words ORDER BY learned_rating ASC"
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

  app.patch('/save_quiz', function (req, res, next) {
    // console.log(`req.body: `, req.body)
    var d = moment().format('YYYY-MM-DD H:mm:ss');
    var cor = 0
    var wro = 0
    db.run(`BEGIN TRANSACTION;`);
    req.body.forEach(el => {
      var data = {
        id: el.id,
        correct: el.correct,
      }

      var rate = 0
      if (data.correct == true) {
        rate = 1
        cor = cor + 1
      } else { wro = wro + 1 }

      var sql =`UPDATE words SET 
      learned_rating=learned_rating+?,
      last_answered=?, 
      last_result=?
      WHERE id=?`
      var params = [rate, d, rate, data.id]
      
      db.run(sql, params)
    });
    
    var sql_h = `INSERT INTO history(quiz_date, answered_correct, answered_wrong) VALUES(?, ?, ?)`
    var params_h = [d, cor, wro]
    db.run(sql_h, params_h)

    db.run(`COMMIT;`, (err) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({"message":"Data updated"})
    });
  });
   
  // function closeDB(){
  //   db.close((err) => {
  //     if (err) {
  //       console.error(err.message);
  //     }
  //     console.log('Close the database connection.');
  //   });
  // }