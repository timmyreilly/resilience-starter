var map;

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: BingMapsKey,
        center: new Microsoft.Maps.Location(37.78, -122.44),
        zoom: 10        
    });

    //Create an infobox, but hide it. We can reuse it for each pushpin.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), { visible: false });
    infobox.setMap(map);

    var parameters = {"bob": "ross"}; 

    $.get('/p', parameters, function(data){
        console.log(data); 
    })

    var randomLocations = Microsoft.Maps.TestDataGenerator.getLocations(5, map.getBounds()); 

    $.get('/pushpins', {number : 5, partitionKey: 'water'}, function(data){
        // now we have the data let's push some pins. 
        for (var i = 0; i < data.length; i++){
            console.log(data[i]); 
            var lat = parseFloat(data[i].lat._);  
            var lon = parseFloat(data[i].lon._); 
            var loc = new Microsoft.Maps.Location(lat, lon);
            var pin = new Microsoft.Maps.Pushpin(loc); 

            pin.metadata = {
                title : data[i].title._ + " Asset: " + data[i].asset._, 
                description : data[i].description._  
            }

            // Add a click event handler to the pushpin. 
            Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
            
            map.entities.push(pin); 
        }


        console.log(data); 
    })


}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

