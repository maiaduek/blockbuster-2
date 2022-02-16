const router = require("express").Router();
const axios = require('axios');
const User = require("../models/User.model");


// router.get('/random-movies', (req, res) => {
//   const options = {
//     method: 'GET',
//     url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
//     params: {type: 'get-random-movies', page: '1'},
//     headers: {
//       'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
//       'x-rapidapi-key': 'a460bb0bd0msh814d08d164cd76bp1b1451jsn09211e97f6aa'
//     }
//   };

//   // res.render('movies/random-movies')
//   axios.request(options)
//   .then(function (response) {
//     // console.log(console.log("RESPONSE DATA::",response.data));
//     // console.log("RES::::::", res)
//     res.render('movies/random-movies', {movies: response.data.movie_results})
//   }).catch(function (error) {
//     console.error(error);
//   });
// })

// router.get('/trending-movies', (req, res) => {
//   console.log("IN TRENDING ROUTE")
//   const options = {
//     method: 'GET',
//     url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
//     params: {type: 'get-trending-movies', page: '1'},
//     headers: {
//       'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
//       'x-rapidapi-key': 'a460bb0bd0msh814d08d164cd76bp1b1451jsn09211e97f6aa'
//     }
//   };
  
//   axios.request(options)
//   .then(function (response) {
//     console.log("TRENDING::", response.data);
//     res.render('movies/trending-movies', {movies: response.data.movie_results})
//   }).catch(function (error) {
//     console.error(error);
//   });
// })

// router.get('/:id', (req, res) => {
//   const options = {
//     method: 'GET',
//     url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
//     params: {type: 'get-movie-details', imdb: `${req.params.id}`},
//     headers: {
//       'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
//       'x-rapidapi-key': 'a460bb0bd0msh814d08d164cd76bp1b1451jsn09211e97f6aa'
//     }
//   };

//   axios.request(options)
//   .then(function (response) {
//     // console.log("MOVIE DEETS:::", response.data);
//     res.render('movies/movie-details', response.data)
//   }).catch(function (error) {
//     console.error(error);
//   });
// })

// router.post('/:id', (req, res) => {
//   const options = {
//     method: 'GET',
//     url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
//     params: {type: 'get-movie-details', imdb: `${req.params.id}`},
//     headers: {
//       'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
//       'x-rapidapi-key': 'a460bb0bd0msh814d08d164cd76bp1b1451jsn09211e97f6aa'
//     }
//   };
//   let movieName;
//   axios.request(options)
//   .then(function (response) {
//     console.log("MOVIE DEETS:::", response.data);
//     movieName = response.data.title
//     User.findByIdAndUpdate(req.session.user, {
//       $addToSet: {favoriteMovies: movieName}
//     }, {
//       new: true
//     })
//     .then(results => {
//       console.log("RESULTS ADDING TO FAVS:::", results)
//       res.redirect('/auth/profile')
//     })
//     .catch(err => {
//       console.log(err)
//     })
//   }).catch(function (error) {
//     console.error(error);
//   });

//   // console.log("REQ SESSION USER FROM DEETS PG:::", req.session.user)
// })



module.exports = router;