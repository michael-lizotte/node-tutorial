const request = require('request')

const config = require('./../config')

var fetchWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${config.config.darkSkyKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: (body.currently.temperature - 32) * (5/9),
                apparentTemperature: (body.currently.apparentTemperature -32) * (5/9),
                windSpeed: body.currently.windSpeed,
                windGust: body.currently.windGust,
                windBearing: body.currently.windBearing
            });
        } else {
            callback('Unable to connect');
        }
    });
}

module.exports = {
    fetchWeather
}