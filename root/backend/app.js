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
  var myobj;
  req.on('data', (chunks) => {
    requestBody.push(chunks);
    var parsedData = Buffer.concat(requestBody).toString();
    MongoClient.connect(urll, function (err, db) {
      if (err) throw err;
      var dbo = db.db("test");
      dbo.collection("UserTable").find({},{ projection: { email: 1, password: 1 } }).toArray(function(err, result) {
        if (err) throw err;
        var obj = JSON.parse(parsedData);
        var keys = Object.keys(obj);
        var flag = 0;
        for (var i = 0; i < keys.length; i++) {
          if(keys[i]=="email")
           var index = i;
          if(keys[i]=="password"){
            var indexpass = i;
            console.log(keys[i])
          }
        }
        for (var i = 0; i < result.length; i++) {
            if(obj[keys[index]] == result[i].email ){
              console.log(result[i].password)
              bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(obj[keys[indexpass]], salt, function(err, hash) {
                  if(hash==(result[i].password)){
                    console.log(hash)
                    console.log(result[i].password)
                   res.status(200).send({"user":"ok"});
                   flag = 1;
                }
                });
              });
                 
            }
          }
        if(flag == 0){
         res.status(403).send({"user":"Not ok"});
        }
        db.close();
      });
    });
  });
  req.on('end', () => {
  });
});
app.post('/signup', (req, res) => {
  const requestBody = [];
  var myobj;
  req.on('data', (chunks) => {
    requestBody.push(chunks);
    var parsedData = Buffer.concat(requestBody).toString();
      MongoClient.connect(urll, function (err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("UserTable").find({},{ projection: { email: 1, password: 1 } }).toArray(function(err, result) {
          if (err) throw err;
          var obj = JSON.parse(parsedData);
          var keys = Object.keys(obj);
          var flag = 0;
          for (var i = 0; i < keys.length; i++) {
            if(keys[i]=="email"){
             var index = i;
             break;
            }
          }
          for (var i = 0; i < result.length; i++) {
              if(obj[keys[index]] == result[i].email){  
                res.status(403).send({"user":"Not ok"});
                flag = 1;
              }
            }
          if(flag == 0){
            MongoClient.connect(urll, function (err, db) {
              if (err) throw err;
              var dbo = db.db("test");
              for (var i = 0; i < keys.length; i++) {
                if(keys[i]=="password"){
                 bcrypt.genSalt(saltRounds, function(err, salt) {
                  bcrypt.hash(obj[keys[i]], salt, function(err, hash) {
                      // Store hash in your password DB.
                      dbo.collection("UserTable").insertOne(JSON.parse(JSON.stringify(obj)), function (err, res) {
                        if (err) throw err;
                        db.close();
                     
                    });
                    db.close();
                    res.status(200).send({"user":"ok"});
                  });
                 });
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