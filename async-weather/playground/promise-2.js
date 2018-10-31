const request = require('request');

const config = require('./../config');
const geocodeMenu = require('./../geocode/geocodePrint');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedURI = encodeURIComponent(address);

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=${config.config.geocodeKey}&location=${encodedURI}`,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect');
            } else if(body.info.statuscode != '0') {
                reject('Unable to find the address');
            }        
            if(false)
                geocodeMenu.printAddress(body.results[0].locations);

            resolve({
                locations: geocodeMenu.formatAddressList(body.results[0].locations)
            });
        });
    });
};

geocodeAddress('g7x5l9').then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage)
});