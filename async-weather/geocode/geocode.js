const request = require('request');

const config = require('./../config');
const geocodeMenu = require('./geocodePrint');

var geocodeAddress = (address, print, callback) => {
    var encodedURI = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=${config.config.geocodeKey}&location=${encodedURI}`,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect');
            return;
        } else if(body.info.statuscode != '0') {
            callback('Unable to find the address');
            return;
        }        
        if(print)
            geocodeMenu.printAddress(body.results[0].locations);

        callback(undefined, {
            locations: geocodeMenu.formatAddressList(body.results[0].locations)
        });
    });
}

module.exports = {
    geocodeAddress
}