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


server.get('/', (req, res) => {
    res.status(200).send('home route')
})

server.get('/test', (request, response) => {
    response.status(200).send('my server is working')
})




//localhost:3001/getWeatherInfo?cityName=Amman
// let lat = req.query.lat;
// let lon = req.query.lon;

server.get('/weather', getWeatherdata);

function getWeatherdata(request, response) {

    const searchQuery = request.query.cityName

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`
    // https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=3fb0c5b4927448a4a3a98aa0ddb1c423
    axios
        .get(url)
        .then(weatherData => {

            response.status(200).send(weatherData.data.data.map(day => {
                return new Forecast(day)
            }))

        })
        .catch(error => {
            response.status(500).send(error)
        })


};
let memoryData= {};

server.get('/movie', getMoviedata);

function getMoviedata(request, response) {

    const searchQuery = request.query.cityName

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
    // https://api.themoviedb.org/3/search/movie?api_key=612411cc0ea188e202e140f65be10d86&query=Amman

    axios
        .get(url)
        .then(movieData => {

            response.status(200).send(movieData.data.results.map(item => {
                return new Movie(item)
            }))

        })
        .catch(error => {
            response.status(500).send(error)
        })


};
server.get('*', (request, response) => {
    response.status(500).send('NOT FOUND')
})
class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;


    }
}

class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }
}


console.log(Forecast);


server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})