const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const publicDirectory = path.join(__dirname, '../public')
const viewDirectoy = path.join(__dirname, '../hbs/views')
const partialsDirectory = path.join(__dirname, '../hbs/partials')

app.use(express.static(publicDirectory))

app.set('view engine', 'hbs')
app.set('views', viewDirectoy)
hbs.registerPartials(partialsDirectory)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Simonffy Ákos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Simonffy Ákos'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Simonffy Ákos',
        message: 'Try it harder, it is a simple page, realy easy to use...'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please add a searching criteria.'
        })
    } else {    
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    location: location,
                    forecast: forecastData
                })
            })
        })
    }
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please add a searching criteria.'
        })
    }

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Simonffy Ákos',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Simonffy Ákos',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
