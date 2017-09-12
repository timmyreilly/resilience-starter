require("dotenv").config();

const path = require("path");
const express = require("express");
const fs = require("fs");

const app = express();
const server = require("http").createServer(app);

const azure = require('azure-storage');
const uuid = require('node-uuid');

var GeoJSON = require('geojson');

var bingCredentials = process.env.BingMapsKey
console.log('Bing Credentials: ' + bingCredentials);

var tableName = process.env.TABLE_NAME;
var partitionKey = process.env.PARTITION_KEY;
var accountName = process.env.STORAGE_NAME;
var accountKey = process.env.STORAGE_KEY;

//var AssetList = require('./assetList'); 
//var Asset = require('./asset'); 

// var asset = new Asset(azure.createTableService, 'BingMeta', 'resiliency'); 
// var assetList = new AssetList(asset); 

app.use(express.static(path.join(__dirname, "public")));

var poi = {
    lat: 0,
    lon: 0,
    title: '',
    desc: '',
    author: '', 
    asset: ''
};

var tableService = azure.createTableService(process.env.STORAGE_CONNECTION_STRING);
tableService.createTableIfNotExists('BingMeta', function (error, result, response) {
    if (!error) {
        console.log(result);
        // result contains true if created; false if already exists
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/" + "index.html");
});

app.get("/entry", function (request, response) {
    var val = request.query.entry;
    console.log(val);
});

// INCIDENTS_API_JSON_URL: 'https://data.sfgov.org/resource/amb9-e5y3.json',
app.get("/resource", function(req, res){
    var query = new azure.TableQuery(); 

    tableService.queryEntities('BingMeta', query, null, function (error, result, response){
        if(!error){
            res.json(result.entries); 
        }
    })
});

app.get("/raw", function(req, res){
    res.json({
        "action":"establish",
        "category":"parking",
        "date":"2011-04-19T00:00:00.000",
        "description":"wazzzup",
        "location":{
            "type":"Point",
            "coordinates":[
                -122.450875079707,
                37.762676

            ]
        }
        
    }); 
}); 

var entityResolver = function(entity){
    var resolvedEntity = {}; 
    for(key in entity){
        resolvedEntity[key] = entity[key]._; 
    }
    return resolvedEntity; 
}



app.get("/baw", function(request, response){
    var r = []; 
    var query = new azure.TableQuery(); 

    tableService.queryEntities('BingMeta', query, null, function(error, result, response){
        if(!error){
            re = result.entries; 
            // eoJSON.parse(r, {Point: })
            rb = response.body; 


        }
    } )
    response.sendStatus(200); 
})

app.get("/azure", function (request, response) {

    poi.lat = request.query.loc['y'];
    poi.lon = request.query.loc['x'];
    poi.title = request.query.meta['title'];
    var rest = JSON.parse(request.query.meta['description']);
    poi.desc = rest['description'];
    poi.author = rest['author']; 
    poi.asset = rest['asset'];

    sendToAzure(poi);
    console.log(poi);
})

app.get("/pushpins", function(req, res){
    var query = new azure.TableQuery().top(req.query.number); 

    tableService.queryEntities('BingMeta', query, null, function (error, result, response) {
        if (!error) {
            console.log(result.entries);
            res.json(result.entries); 
        }
    })


})



console.log(`Starting server on ${process.env.PORT}`);
server.listen(process.env.PORT || 8080);

// var x = JSON.parse(request.query.meta['description']) 

function sendToAzure(poi) {
    var entGen = azure.TableUtilities.entityGenerator;

    var entity = {
        PartitionKey: entGen.String(poi.asset),
        RowKey: entGen.String(uuid()),
        title: entGen.String(poi.title),
        description: entGen.String(poi.desc),
        author: entGen.String(poi.author), 
        lat: entGen.String(poi.lat),
        lon: entGen.String(poi.lon),
        asset: entGen.String(poi.asset)
    };

    tableService.insertEntity('BingMeta', entity, function (error, result, response) {
        if (!error) {
            console.log(result);
        }
        else {
            console.log(error);
        }
    });
}; 