var request = require('request')


var geocode = (address, callback) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF4ZXJpY2giLCJhIjoiY2tlOTVnZGV2MDE4aDJ0cDlmbzhocTllcCJ9.MQwstX8mO48k1I9atd01Gw&limit=1'

    request({ url: url, json: true}, (error, response) => {
        if (error){
            callback('cannot connect to location service', undefined)
        }
        else if (response.body.features.length === 0) {
            callback('unable to find geolocation', undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode