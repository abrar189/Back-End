'use strict';

const express = require('express');
require('dotenv').config();

const axios = require('axios');


const cors = require('cors');


const weatherData = require('./data/weather.json');
const { response } = require('express');


const server = express();
const PORT = process.env.PORT;
server.use(cors());

const getMoviedata = require('./modules/movie.js');
const getWeatherdata = require('./modules/weather.js');



server.get('/', (req, res) => {
    res.status(200).send('home route')
})

server.get('/test', (request, response) => {
    response.status(200).send('my server is working')
})


//localhost:3030/weather?cityName=Amman
server.get('/weather', getWeatherdata);

server.get('/movie', getMoviedata);


server.get('*', (request, response) => {
    response.status(500).send('NOT FOUND')
})

server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})