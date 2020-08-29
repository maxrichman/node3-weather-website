var request = require('request')

var forecast = (latitude, longitude, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=d81f860df3e118712206155937ae86ca&query=' + latitude + ',' + longitude + '&units=f'

    request({ url:url, json:true}, (error, response) => {
        if(error) {
            callback('unable to connect to weather service', undefined)
        }
        else if (response.body.error) {
            callback("unable to find location", undefined)
        }
        else {
            callback(undefined, {
                current: response.body.current
            })
        }
    })
}

module.exports = forecast