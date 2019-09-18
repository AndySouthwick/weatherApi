const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const weatherKey = '8187db73e824bb2e1acd55e528c0b00a'
app.use(cors())
const fetch = require('node-fetch')

const kelvinFarForm = (k) => {
   return Number((1.8 * (Number(k) - 273) + 32).toFixed(2)) 
}

app.get('/londonWeather', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${weatherKey}`)
    .then(r => r.json())
    .then(r => res.send(r)
    )
})

app.get('/saltLakeCity', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=5781004&appid=${weatherKey}`)
    .then(r => r.json())
    .then(r => {
        newWeatherObject = {
            weather: r.weather,
            main: r.main,
            location: r.name
        }
        
        newWeatherObject.main.temp = kelvinFarForm(newWeatherObject.main.temp)
        newWeatherObject.main.temp_min = kelvinFarForm(newWeatherObject.main.temp_min)
        newWeatherObject.main.temp_max = kelvinFarForm(newWeatherObject.main.temp_max)
        res.send(newWeatherObject)
    }
    )
})
app.listen(3001, () => console.log('listening on port 3001'))