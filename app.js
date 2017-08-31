require("dotenv").config();

const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();
const server = require("http").createServer(app);

var bingCredentials = process.env.BingMapsKey
console.log('Bing Credentials: ' + bingCredentials);

app.use(express.static(path.join(__dirname, "public")));

var poi = {
    lat: 0, 
    lon: 0, 
    title: '',
    desc: '', 
    asset: ''
}; 

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get("/basic", (req, res) => {
    res.sendFile(__dirname + "/" + "basic.html");
});

app.get("/origin", (req, res) => {
    res.sendFile(__dirname +  "/" + "create-push-pin.html"); 
})

app.get("/entry", function (request, response) {
    var val = request.query.entry;
    console.log(val);
});

app.get("/azure", function (request, response){
    poi.lat = request.query.loc['x'];
    poi.lon = request.query.loc['y']; 
    poi.title = request.query.meta['title']; 
    var rest = JSON.parse(request.query.meta['description']); 
    poi.desc = rest['description'];
    poi.asset = rest['asset']; 
    
    console.log(poi); 
})

app.get("/secrets", function (request, response) {
    console.log("Going to send: " + bingCredentials);
    response.send(bingCredentials);
})

console.log(`Starting server on ${process.env.PORT}`);
server.listen(process.env.PORT || 8080);

// var x = JSON.parse(request.query.meta['description']) 