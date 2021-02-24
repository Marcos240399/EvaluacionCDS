var fs = require('fs');
var app = require('../app');
var jwt = require('jsonwebtoken');
var userDataAccess = require('../data_access/users');
var movieDataAccess = require('../data_access/movies')


exports.searchMovies = (req, res) => {
    var keyword = req.params.keyword;
    movieDataAccess.theMovieDbApiSearch(keyword).then(
        (movies) => {
            return res.status(200).send({ searchResult: movies })
        },
        (err) => { return res.status(400).send({ error: err.message }) }
    );
}
exports.addFavMovie = (req, res) => {
    movieDataAccess.addFavMovie(req.body.movie).then(
        (movie) => {
            return res.status(200).send({ movieAdded: movie })
        },
        (err) => { return res.status(400).send({ error: err.message }) }
    );
}
exports.getAllFavMovies = (req, res) => {
    movieDataAccess.getFavs().then(
        (movies) => { res.status(200).send({ favoriteMovies: movies }) },
        (err) => { return res.status(404).send({ error: err.message }) }
    )
}