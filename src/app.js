var path = require('path')
var express = require('express')
var hbs = require('hbs')
var geocode = require('./utils/geocode.js')
var forecast = require('./utils/forecast.js')

var app = express()


//define paths for Express config
var publicDirectoryPath = path.join(__dirname, '../public')
var viewsPath = path.join(__dirname, '../templates/views')
var partialsPath = path.join(__dirname, '../templates/partials')


// setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'max'
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        title: 'Help',
        name: 'max r',
        help: 'help me please :)'
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: 'about me',
        name: 'max'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query.address)
    if(!req.query.address) {
        return res.send({
            error: "no address provided"
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error) {
            return console.log("error", error)
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return console.log('Error', error)
            }
            
            console.log(data.location)
            console.log(forecastData)
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: data.location
            })
        })
    })    

    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "you must provide a search"
        })
    }
    console.log("req.query:", req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send('my 404 page')
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})