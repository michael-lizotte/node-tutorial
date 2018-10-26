var formatAddress = (location) => {
    var address = `${location.street} ${location.adminArea4} ${location.adminArea3} ${location.adminArea1} ${location.postalCode}`;
    address = address.replace(/^\s+|\s+$/g, "")
    
    return address;
}

var formatAddressList = (locations) => {
    var address = [];

    for(var i = 0; i < locations.length; i++)
    {
        address.push({
            address: formatAddress(locations[i]),
            latitude: locations[i].latLng.lat,
            longitude: locations[i].latLng.lng
        });
    }

    return address;
}

var printAddress = (locations) => {
    var numberOfAddress = locations.length;

    console.log("|---------------------------------------------------------------------------------|")
    console.log(`|                      Number of address found: ${numberOfAddress}`);
    console.log("|---------------------------------------------------------------------------------|")
    for(var i = 0; i < numberOfAddress; ++i) {
        var formatedAddress = formatAddress(locations[i]);
        
        if(i == 0) {
            console.log("|1st address: " + formatedAddress);
        } else if (i == 1) {
            console.log("|2nd address: " + formatedAddress);            
        } else if (i == 2) {
            console.log("|3rd address: " + formatedAddress);
        } else {
            console.log(`|${i+1}th address: ${formatedAddress}`);
        }
        console.log(`|Latitude: ${locations[i].latLng.lat}`)
        console.log(`|Longitude: ${locations[i].latLng.lng}`);
        console.log(`|Geocode Quality: ${locations[i].geocodeQuality}`);
        console.log("|---------------------------------------------------------------------------------|");
    }
}

module.exports = {
    printAddress,
    formatAddressList
}