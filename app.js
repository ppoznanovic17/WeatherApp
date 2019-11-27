const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Definisanje path-a za Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './public/templates/views')
const partialsPath = path.join(__dirname, './public/templates/partials')

//Podesavanje handlebars engine i lokacije view foldera
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Podesen statican fajl koji ce nas server da opsluzuje
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Petar Poznanovic'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Petar Poznanovic'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Petar Poznanovic'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
       res.send("Adress not found" )
    }else{
        geocode(req.query.address, (err, { latitude, longitude, location} = {}) => {
            if(err){
                return res.send({ err })
            }

            forecast(latitude,longitude, (err, forecastData) => {
                if(err){
                    return res.send({ err })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })

            })
        })
    }
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Page not found.',
        name: 'Petar Poznanovic'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

