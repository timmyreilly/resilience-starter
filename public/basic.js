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

    $.get('/pushpins', parameters, function(data){
        console.log(data); 
    })


}
