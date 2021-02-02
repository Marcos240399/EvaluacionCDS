var fs = require('fs');
var app = require('../app');
var jwt = require('jsonwebtoken');
var userDataAccess = require('../data_access/users');
var movieDataAccess = require('../data_access/movies')


exports.searchMovies = (req, res) => {
    var keyword = req.params.keyword;
    movieDataAccess.theMovieDbApiSearch(keyword).then(
        (value) => {
            return res.status(200).send({ movies: value })
        },
        (err) => { return res.status(400).send({ error: err.message }) }
    );
}
exports.addFavMovie = (req,res) => {
    movieDataAccess.addFavMovie(req.body.movie).then(
        (value) => {
            return res.status(200).send({ movieAdded: value})
        },
        (err) => {return res.status(400).send({error: err.message})}
    );
}