const yargs = require('yargs');
const _ = require('lodash');
const axios = require('axios');

const weather = require('./weather/weather');
const geocode = require('./geocode/geocode');
const config = require('./config');

var argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedURI = encodeURIComponent(argv.address);
var geocodeURL = `http://www.mapquestapi.com/geocoding/v1/address?key=${config.config.geocodeKey}&location=${encodedURI}`

axios.get(geocodeURL).then((res) => {
    if (res.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find the address');
    }

    var lat = res.data.results[0].locations[0].latLng.lat;
    var lng = res.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${config.config.darkSkyKey}/${lat},${lng}`;
    return axios.get(weatherUrl);
}).then((res) => {
    var properties = {
        temperature: (res.data.currently.temperature - 32) * (5/9),
        apparentTemperature: (res.data.currently.apparentTemperature -32) * (5/9),
        windSpeed: res.data.currently.windSpeed,
        windGust: res.data.currently.windGust,
        windBearing: res.data.currently.windBearing
    }
    console.log(JSON.stringify(properties, undefined, 2));
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});