'use strict';

const axios = require('axios');
module.exports = getMoviedata;
let memoryData={};

function getMoviedata(request, response) {

    const searchQuery = request.query.cityName

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`
    // https://api.themoviedb.org/3/search/movie?api_key=612411cc0ea188e202e140f65be10d86&query=Amman
if(memoryData[searchQuery] !== undefined){
    console.log('catch hit')
    response.send(memoryData[searchQuery]);
} 

else{
    axios
        .get(url)
        .then(movieData => {
            console.log('catch miss')
         memoryData[searchQuery]=movieData.data.results
            response.status(200).send(movieData.data.results.map(item => {
                return new Movie(item)
            }))

        })
        .catch(error => {
            response.status(500).send(error)
        })

}
};
console.log('movie')

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