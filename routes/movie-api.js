const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/random-movie', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
    params: {type: 'get-random-movies', page: '1'},
    headers: {
      'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
      'x-rapidapi-key': 'a460bb0bd0msh814d08d164cd76bp1b1451jsn09211e97f6aa'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(console.log("RESPONSE DATA::",response.data));
    res.render('movies/random-movie', {movies: response.data.movie_results})
  }).catch(function (error) {
    console.error(error);
  });
})

module.exports = router;