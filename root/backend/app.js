const express = require('express');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var urll = "mongodb+srv://dbUser:r5ZGxlkPdhohjDlI@gt.eef7b.mongodb.net/test";
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(cors())



app.post('/Signin', (req, res) => {
  const requestBody = [];

  req.on('data', (chunks) => {

    requestBody.push(chunks);
    var parsedData = Buffer.concat(requestBody).toString();
    var obj = JSON.parse(parsedData);
    var keys = Object.keys(obj);
    var flag = 0;
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == "email")
        var index = i;
      if (keys[i] == "password") {
        var indexpass = i;
      }
    }//for loop ends here keys.length

    //DB Connection
    MongoClient.connect(urll, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("UserTable").find({}, { projection: { email: 1, password: 1 } }).toArray(function (err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
          if (obj[keys[index]] == result[i].email) {
            if (bcrypt.compareSync(obj[keys[indexpass]], result[i].password)) {
              res.status(200).send({ "user": "ok" });
              flag = 1;
            }
            //console.log("i reached"+i)
            if (flag == 1)
              break;

          }//if loop ends here email validation
        }//for loop ends here result.length


        if (flag == 0) {
          res.status(403).send({ "user": "Not ok" });
        }
        db.close();
      });//db findone ends here

    });//mongodb connection ends here


  });//req.on ends here

  req.on('end', () => {
  });//req.on ends here

});//post ends here




app.post('/signup', (req, res) => {
  const requestBody = [];
  var myobj;
  req.on('data', (chunks) => {
    requestBody.push(chunks);
    var parsedData = Buffer.concat(requestBody).toString();
    MongoClient.connect(urll, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("UserTable").find({}, { projection: { email: 1, password: 1 } }).toArray(function (err, result) {
        if (err) throw err;
        var obj = JSON.parse(parsedData);
        var keys = Object.keys(obj);
        var flag = 0;
        for (var i = 0; i < keys.length; i++) {
          if (keys[i] == "email") {
            var index = i;
            break;
          }
        }
        for (var i = 0; i < result.length; i++) {
          if (obj[keys[index]] == result[i].email) {
            res.status(403).send({ "user": "Not oK" });
            flag = 1;
          }
        }
        if (flag == 0) {
          MongoClient.connect(urll, function (err, db) {
            if (err) throw err;
            var dbo = db.db("test");
            for (var i = 0; i < keys.length; i++) {
              if (keys[i] == "password") {
                obj[keys[i]] = bcrypt.hashSync(obj[keys[i]], saltRounds)
                // Store hash in your password DB.
                console.log(obj[keys[i]]);
                dbo.collection("UserTable").insertOne(JSON.parse(JSON.stringify(obj)), function (err, res) {
                  if (err) throw err;
                  db.close();

                });
                db.close();
                res.status(200).send({ "user": "ok" });
                break;
              }
            }
          });
        }
      });
    });
  });
  req.on('end', () => {
  });
});




app.listen(2020, () => {
  console.log('server is listening on port 2020');
});