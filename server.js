'use strict';

const express = require('express');
require('dotenv').config();


const cors = require('cors');


const weatherData = require('./data/weather.json');
const { response } = require('express');


const server = express();
const PORT = process.env.PORT;
server.use(cors());


server.get('/', (req, res) => {
    res.status(200).send('home route')
})

server.get('/test', (request, response) => {
    response.status(200).send('my server is working')
})


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})

//localhost:3030/getWeatherInfo?cityName=Amman
server.get('/getWeatherInfo', (req, res) => {

    let selectedCity = weatherData.find(city => {
        if (city.city_name.toLowerCase() == req.query.cityName.toLowerCase()) {

            return city

        } else {
            return ('Please enter the correct city !')
        }

    })

    let cityInfo = selectedCity.data.map(day => {
        console.log(day);
        return new Forecast(day.valid_date, day.weather.description)

    })
    res.status(200).send(cityInfo)
    console.log(cityInfo);
})

class Forecast {
    constructor(date, description) {
    this.date = date;
    this.description = description;
    }}

console.log(Forecast);