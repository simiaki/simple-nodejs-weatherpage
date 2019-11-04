const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0b942d9c333cab7ed417544aca71c248/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect forecast service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + Math.round(body.currently.temperature) + ' degrees out. Lowest temperature: ' + Math.round(body.daily.data[0].temperatureLow) + ' degrees. Highest temperature: ' + Math.round(body.daily.data[0].temperatureHigh) + ' degrees. There is a ' + body.currently.precipProbability * 100 + '% chance of rain.')
        }
    })
}

module.exports = forecast