const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e3cb8fb5f59a3e86822c810d6f19e6f5/'+ latitude + ',' + longitude +'?units=si&lang=hr'

    request({url: url, json: true}, (err, {body}) =>{
        if(err){
            callback('Povezivanje na servis vremenske prognoze nije uspelo.', undefined)
        }else if(body.error){
            callback('Lokacija nije pronadjena.')
        }else{
            callback(undefined, body.daily.data[0].summary + 'Trenutno je ' + body.currently.temperature + ' stepeni. ' + 'Sansa da ce pasti kisa je ' + body.currently.precipProbability +' %.')
        }
    })
}

module.exports = forecast
