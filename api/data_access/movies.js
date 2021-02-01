var request = require('request');
const { response } = require('../app');

exports.theMovieDbApiSearch = async function (keyword) {
    myPromise = new Promise(function (myResolve, myReject) {
        var url = 'https://api.themoviedb.org/3/search/movie?api_key=adc6ce1c5f8e418bbe08eedf35075b9a&language=en-US&query='.concat(keyword);
        return request.get(url, function (err, response, body) {
            if (!err) {
                var locals = JSON.parse(response.body);
                locals.results.forEach(movie => {
                    movie.suggestionScore = Math.floor(Math.random() * 100);
                });
                locals.results.sort(function (a, b){return a.suggestionScore - b.suggestionScore});
                myResolve(locals);
            }
            else {
                throw err;
            };
        });
    })

    return myPromise.then(
        (value) => { return Promise.resolve(value) },
        (error) => { return Promise.reject(error) }
    )

}