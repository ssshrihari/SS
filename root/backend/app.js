const express = require('express');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var urll = "mongodb+srv://dbUser:r5ZGxlkPdhohjDlI@gt.eef7b.mongodb.net/test";

const cors = require('cors');

const app = express();
app.use(cors())
app.post('/click', (req, res) => {
  MongoClient.connect(urll, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = { name: "Company Inc", address: "Highway 37" };

    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();

   });
  });
    res.json({
        message: "Chill Bro"
    });
});

app.post('/:name', (req, res) => {
    let name = req.params.name;
    // res.json(req.body)
    res.json({
        message: `Hello ${name}`
    });
});

app.listen(2020, () => {
    console.log('server is listening on port 2020');
});