const express = require('express');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var urll = "mongodb+srv://dbUser:r5ZGxlkPdhohjDlI@gt.eef7b.mongodb.net/test";
const cors = require('cors');
const app = express();
app.use(cors())
app.post('/click', (req, res) => {
  MongoClient.connect(urll, function (err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    const requestBody = [];
    req.on('data', (chunks) => {
      requestBody.push(chunks);
    });
    req.on('end', () => {
      var parsedData = Buffer.concat(requestBody).toString();
      var myobj = { name: parsedData};
      dbo.collection("customers").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted"+ parsedData);
      db.close();
    });
    });
  });
});
app.listen(2020, () => {
  console.log('server is listening on port 2020');
});