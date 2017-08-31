var map, infobox, currentPushpin;

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: BingMapsKey,
        center: new Microsoft.Maps.Location(37.78, -122.44),
        zoom: 10        
    });

    //Add a click event to the map.
    Microsoft.Maps.Events.addHandler(map, 'click', mapClicked);

    //Create an infobox, but hide it. We can reuse it for each pushpin.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), { visible: false });
    infobox.setMap(map);
}


function mapClicked(e) {
    //Create a pushpin.
    currentPushpin = new Microsoft.Maps.Pushpin(e.location);

    //Add a click event to the pushpin.
    Microsoft.Maps.Events.addHandler(currentPushpin, 'click', pushpinClicked);

    //Add the pushpin to the map.
    map.entities.push(currentPushpin);

    //Open up an input form here the user can enter in details for pushpin. 
    document.getElementById('inputForm').style.display = '';
}

function submitToDB(title) {
    var parameters = { entry: title };
    $.get('/entry', parameters, function (data) {
        $('#output').html(data);
    });
}

function submitToAzure(metadata, location){
    var parameters = { meta : metadata, loc : location }; 
    $.get('/azure', parameters, function (data){
        alert(data);}, 'json'
    )
}

function saveData() {
    //Get the data from form and add it to the pushpin
    currentPushpin.metadata = {
        title: document.getElementById('titleTbx').value,
        description: '{ "description" : "' + document.getElementById('descriptionTbx').value + '", "asset" :"' + document.getElementById('assetSelect').value + '"}'   
        // description: document.getElementById('descriptionTbx').value + " Asset: " + document.getElementById('assetSelect').value
    };
    

    console.log("currentPushpingmetatdata: " + currentPushpin.metadata.title);

    //Optionally save this data somewhere (like a database or local storage).
    submitToDB(currentPushpin.metadata);
    submitToAzure(currentPushpin.metadata, currentPushpin.geometry); 

    //Clear the fields in the form and then hide the form.
    document.getElementById('titleTbx').value = '';
    document.getElementById('descriptionTbx').value = '';
    document.getElementById('assetSelect').value = ''; 
    document.getElementById('inputForm').style.display = 'none';
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            asset: e.target.metadata.asset,  
            visible: true
        });
    }
}