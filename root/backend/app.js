
var http = require('http');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var urll = "mongodb+srv://dbUser:r5ZGxlkPdhohjDlI@gt.eef7b.mongodb.net/test";



http.createServer(function (req, res) { 
      
  // http header 
  res.writeHead(200, {'Content-Type': 'text/html'});  
    
  var url = req.url; 
    
  if(url ==='/click') { 
      res.write(' Welcome to about us page');  
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
      res.end();  
  } 
  else if(url ==='/contact') { 
      res.write(' Welcome to contact us page');  
      res.end();  
  } 
  else { 
      res.write('Hello World!');  
      res.end();  
  } 
}).listen(3000, function() { 
    
  // The server object listens on port 3000 
  console.log("server start at port 3000"); 
}); 


    





