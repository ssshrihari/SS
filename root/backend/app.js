const express = require('express');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var urll = "mongodb+srv://dbUser:r5ZGxlkPdhohjDlI@gt.eef7b.mongodb.net/test";
const cors = require('cors');
const app = express();
app.use(cors())

app.post('/Signin', (req, res) => {
  const requestBody = [];
  var myobj;
  req.on('data', (chunks) => {
    requestBody.push(chunks);
  });
  req.on('end', () => {
    var parsedData = Buffer.concat(requestBody).toString();
    MongoClient.connect(urll, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("UserTable").findOne(JSON.parse(parsedData), function (err, res) {
        if (err) throw err;
        console.log("User Record found");
        db.close();
      });
    });
  });
  res.json(req.body);
});

app.post('/signup', (req, res) => {
  const requestBody = [];
  var myobj;
  req.on('data', (chunks) => {
    requestBody.push(chunks);
  });
  req.on('end', () => {
    var parsedData = Buffer.concat(requestBody).toString();
    MongoClient.connect(urll, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("UserTable").insertOne(JSON.parse(parsedData), function (err, res) {
        if (err) throw err;
        console.log("User details inserted");
        db.close();
      });
    });
  });
  res.json(req.body);
});

app.listen(2020, () => {
  console.log('server is listening on port 2020');
});