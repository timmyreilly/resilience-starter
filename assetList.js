var azure = require('azure-storage'); 
var async = require('async'); 

module.exports = AssetList; 

function AssetList(asset){
    this.asset = asset; 
}

AssetList.prototype = {
    showAssets: function(req, res){
        self = this; 
        var query = azure.TableQuery()
        .where('PartitionKey eq ? ', 'water');
        self.task.find(query, function assetsFound(error, assets) {
            res.send(assets)
        }); 
    }, 

    addAsset: function(req, res) { 
        var self = this;
        var asset = req.body.asset; 
        self.task.addItem(item, function assetAdded(error){
            if (error){
                throw error; 
            }
            res.redirect('/')
        })
    }, 

    removeAsset: function(req, res){
        var self = this; 
        var assetToRemove = Object.keys(req.body);
        async.forEach(assetToRemove, function taskIterator(assetOfRemoval, callback){
            self.task.deleteItem(assetOfRemoval, function itemsRemoved(error){
                if (error){
                    callback(error); 
                }else {
                    callback(null); 
                }
            });
        }, function goHome(error){
            if(error){
                throw error;
            }else {
                res.redirect('/'); 
            }
        }); 
    }
}