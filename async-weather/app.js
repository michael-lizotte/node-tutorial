const yargs = require('yargs');
const _ = require('lodash');

const weather = require('./weather/weather');
const geocode = require('./geocode/geocode');

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

    geocode.geocodeAddress(argv.a, false, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        results.locations.forEach(location => {
            weather.fetchWeather(location.latitude, location.longitude, (errorMessage, results) => {
                if(errorMessage)
                    console.log(errorMessage)
                else {
                    var newLocation = Object.assign({}, location, results);
                    console.log(JSON.stringify(newLocation, undefined, 2));
                }
            });
        })
        
    }
});