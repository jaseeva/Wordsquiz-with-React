const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const csv = require('fast-csv');
const multer = require('multer')
const fs = require('fs')
const cors = require('cors');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(cors())
// global.__basedir = __dirname;
app.use(express.static(path.join(__dirname, 'client/build')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});
const upload = multer({
  storage
})

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/wordsquiz.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the test database.');
    createTable();
});

  const createTable = () => {
    console.log("create database tables");
    db.run(`CREATE TABLE IF NOT EXISTS words (
      id             INTEGER UNIQUE
                             NOT NULL
                             PRIMARY KEY AUTOINCREMENT,
      word           STRING  NOT NULL
                             UNIQUE ON CONFLICT ROLLBACK,
      translation    STRING  NOT NULL,
      learned_rating INT     DEFAULT (0),
      last_answered  DATE,
      last_result    BOOLEAN);`
    );
    db.run(`CREATE TABLE IF NOT EXISTS history (
      quiz_id          INTEGER PRIMARY KEY AUTOINCREMENT
                               UNIQUE
                               NOT NULL,
      quiz_date        DATE    NOT NULL,
      answered_correct INTEGER DEFAULT (0),
      answered_wrong   INTEGER DEFAULT (0));`
    )
    console.log("tables created");
  }

  // Root endpoint
  app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
  });

  app.get("/last_quiz", (req, res, next) => {
    db.all('SELECT * FROM history ORDER BY quiz_id DESC LIMIT 1;', [], (err, rows) => {
      if (err) {
        err.message = `Failed to get quiz history. `+err.message
        next(err);
      }
      res.json(rows);
    });
  })

  app.get("/quiz_history", (req, res, next) => {
    sql = 'SELECT * FROM (SELECT * FROM history ORDER BY quiz_id DESC LIMIT 10) ORDER BY quiz_id ASC;'
    db.all(sql, [], (err, rows) => {
      if (err) {
        err.message = `Failed to get quiz history. `+err.message
        next(err);
      }
      res.json(rows);
    });
  })

  // get the list of all words
  app.get('/list', function (req, res, next) {
    db.all('SELECT * FROM words', [], (err, rows) => {
      if (err) {
        err.message = `Failed to get words list. `+err.message
        next(err);
      }
      res.json(rows);
    });
  });

  function importFileDataToTable (filePath) {
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
            //console.log(`csvData: `, csvData)

            csvData.forEach(el => {
              //console.log(`el: `, el)
              let sql = 'INSERT OR IGNORE INTO words (word, translation) VALUES (?, ?)';
              db.run(sql, el)
            });

            // delete file after saving to MySQL database
			      fs.unlinkSync(filePath)
        });
 
    stream.pipe(csvStream);
  }

  app.post('/upload', upload.single('file'), function (req, res, next) {
    //console.log(`req: `, req.file)
    if (req.file) {
      const fpath = req.file.path
      //console.log(`fpath: `, fpath)
      
      db.run(`BEGIN TRANSACTION;`);

      importFileDataToTable(fpath)

      db.run(`COMMIT;`, (err) => {
        if (err) {
          err.message = `Failed importing data from file to database. `+err.message
          next(err);
        }
        res.json({"message":"Data updated"})
      });
  } else {
      let err = new Error('No Files to Upload.')
      err.statusCode = 409
      next(err);
    }
  });

  app.post('/new_word', (req, res, next) => {
    const word = req.body[0].split(';')
    let sql = 'INSERT OR IGNORE INTO words (word, translation) VALUES (?, ?)';
    db.run(sql, word, (err, rows) => {
      if (err) {
        err.message = `Couldn't add new word ${word} `+err.message
        next(err);
      }
      res.json({"message":"word added", changes: this.changes})
    })
  })

  app.delete('/delete_word/:id', (req, res, next) => {
    const sql = "DELETE FROM words WHERE id = ?"
    const id = req.params.id
    db.run(sql, id, (err, rows) => {
      if (err){
        err.message = `Couldn't delete word with id ${id}. `+err.message
        next(err);
      }
      res.json({"message":"deleted", changes: this.changes})
    })
  })

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

  app.get('/quiz_repeat', function (req, res, next) {
    const sql = "SELECT * FROM words WHERE last_answered = (SELECT max(last_answered) FROM words); ORDER BY random()"
    db.all(sql, (err, rows) => {
      if (err) {
        err.message = `Couldn't compose a quiz. `+err.message
        next(err);
      }
      res.json(rows);
    })
  })

  app.get('/quiz', function (req, res, next) {
    //need to select random words which have rating less than median
    let rates = []
    const sql_m = "SELECT learned_rating from words ORDER BY learned_rating ASC"
    db.all(sql_m, [], (err, rows) => {
      if (err) {
        err.message = `Couldn't count the rating median. `+err.message
        next(err);
      }
      rows.forEach(el => {
        rates.push(el.learned_rating)
      })
      median = countMedian(rates)
      //console.log(`median: `, median)
      const sql = "SELECT * FROM words WHERE learned_rating <= "+median+" ORDER BY random() limit 5"
      db.all(sql, [], (err, rows) => {
        if (err) {
          err.message = `Couldn't compose a quiz. `+err.message
          next(err);
        }
        res.json(rows);
      });
    });
  });

  app.patch('/save_quiz', function (req, res, next) {
    // console.log(`req.body: `, req.body)
    const d = moment().format('YYYY-MM-DD H:mm:ss');
    let cor = 0
    let wro = 0
    db.run(`BEGIN TRANSACTION;`);
    req.body.forEach(el => {
      const data = {
        id: el.id,
        correct: el.correct,
      }

      let rate = 0
      if (data.correct == true) {
        rate = 1
        cor = cor + 1
      } else { wro = wro + 1 }

      const sql =`UPDATE words SET 
      learned_rating=learned_rating+?,
      last_answered=?, 
      last_result=?
      WHERE id=?`
      let params = [rate, d, rate, data.id]
      
      db.run(sql, params)
    });
    
    const sql_h = `INSERT INTO history(quiz_date, answered_correct, answered_wrong) VALUES(?, ?, ?)`
    let params_h = [d, cor, wro]
    db.run(sql_h, params_h)

    db.run(`COMMIT;`, (err) => {
      if (err) {
        err.message = `Couldn't save quiz results. `+err.message
        next(err);
      }
      res.json({"message":"Data updated"})
    });
  });

  app.patch('/reset_ratings', function (req, res, next) {
    const sql = `UPDATE words SET learned_rating=0`;
    db.run(sql, (err, rows) => {
      if (err){
        err.message = `Couldn't reset ratings. `+err.message
        next(err);
      }
      res.json({"message":"ratings reset", changes: this.changes})
    })
  })
   
  app.get(function(req, res, next) {
    let err = new Error(`${req.originalUrl} not found`);
    err.statusCode = 404;
    err.shouldRedirect = true;
    next(err);
  });

  // error handling
  app.use(function(err, req, res, next) {
    if (!err.statusCode) err.statusCode = 500;
    console.error(err.statusCode, err.message);
    res.status(err.statusCode).send(err.message);
  });
  
  // function closeDB(){
  //   db.close((err) => {
  //     if (err) {
  //       console.error(err.message);
  //     }
  //     console.log('Close the database connection.');
  //   });
  // }