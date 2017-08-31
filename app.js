require("dotenv").config();

const path = require("path"); 
const express = require("express"); 

const app = express();
const server = require("http").createServer(app);


app.get("/", (req, res) => {
    // Todo - call transaction update history from blockchain
    res.sendFile(__dirname + "/" + "index.html");
  });

app.get("/entry", function(request, response) {
    var val = request.query.entry; 
    console.log(val); 
}); 

console.log(`Starting server on ${process.env.PORT}`);
server.listen(process.env.PORT || 8080);