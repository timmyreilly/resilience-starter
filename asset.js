// asset.js

var azure = require('azure-storage');
var uuid = require('node-uuid');
var entityGen = azure.TableUtilities.entityGenerator;

module.exports = Asset;

function Asset(storageClient, tableName, partitionKey) {
    this.storageClient = storageClient;
    this.tableName = tableName;
    this.partitionKey = partitionKey;
    this.storageClient.createTableIfNotExists(tableName, function tableCreated(error) {
        if (error) {
            throw error;
        }
    });
};


Asset.prototype = {
    find: function (query, callback) {
        self = this;
        self.storageClient.queryEntities(query, function entitiesQueried(error, result){
            if(error){
                callback(error);
            }else{
                callback(null, result.entries);
            }
        });
    },

    addItem: function(item, callback){
        self = this; 
        // use entityGenerator to set types. NOTE: ROwKey must be a string type, even though it contains a GUID in this example. 
        var itemDescriptor = {
            PartitionKey: entGen.String(self.partitionKey),
            RowKey: entGen.String(uuid()),
            title: entGen.String(item.title),
            description: entGen.String(item.desc),
            lat: entGen.String(item.lat),
            lon: entGen.String(item.lon),
            asset: entGen.String(item.asset)
        }; 

        self.storageClient.insertEntity(self.tableName, itemDescriptor, function entityInserted(error){
            if(error){
                callback(error);
            }
            callback(null);
        });
    },

    updateItem: function(rKey, callback){
        self = this; 
        self.storageClient.retrieveEntity(self.tableName, self.partitionKey, rKey, function entityQueried(error, entity){
            if(error){
                callback(error);
            }
            entity.completed._ = true; 
            self.storageClient.updateEntity(self.tableName, entity, function entityUpdated(error){
                if(error){
                    callback(error);
                }
                callback(null); 
            });
        });
    }
}