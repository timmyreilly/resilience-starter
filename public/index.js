var map, infobox, currentPushpin;

function GetMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        // credentials: "Ap9opDJtO8wtNnk1wNFdz2blihxwv8mPZdB5vEJR7epV3tluq67AFF75nFgVGzMH",
        credentials: BingMapsKey
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

function saveData() {
    //Get the data from form and add it to the pushpin
    currentPushpin.metadata = {
        title: document.getElementById('titleTbx').value,
        description: document.getElementById('descriptionTbx').value, 
        resource: document.getElementById('resource').value 
    };

    console.log("currentPushpingmetatdata: " + currentPushpin.metadata.title);

    //Optionally save this data somewhere (like a database or local storage).
    submitToDB(currentPushpin.metadata);


    //Clear the fields in the form and then hide the form.
    document.getElementById('titleTbx').value = '';
    document.getElementById('descriptionTbx').value = '';
    document.getElementById('inputForm').style.display = 'none';
}

function pushpinClicked(e) {
    if (e.target.metadata) {
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}