var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var url = "mongodb+srv://dbUser:r5ZGxlkPdhohjDlI@gt.eef7b.mongodb.net/test";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myobj = { name: "Company Inc", address: "Highway 37" };

    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();

});
});



