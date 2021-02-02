const request = require('request');
const fs = require('fs');

exports.theMovieDbApiSearch = async function (keyword) {
    myPromise = new Promise(function (myResolve, myReject) {
        var url = 'https://api.themoviedb.org/3/search/movie?api_key=adc6ce1c5f8e418bbe08eedf35075b9a&language=en-US&query='.concat(keyword);
        return request.get(url, function (err, response, body) {
            if (!err) {
                var locals = JSON.parse(response.body);
                locals.results.forEach(movie => {
                    movie.suggestionScore = Math.floor(Math.random() * 100);
                });
                locals.results.sort(function (a, b) { return a.suggestionScore - b.suggestionScore });
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

exports.addFavMovie = async function (movie) {
    let readFavs = new Promise(function (myResolve, myReject) {
        fs.readFile('./favoritos.txt', 'UTF-8', function (err, data) {
            if (!err) {
                myResolve(data);
            }
            else {
                myReject(Error(err));
            }
        });
    })
    return readFavs.then(
        (favs) => {
            let movieIdString = '"id":'.concat(movie.id);
            if (favs.includes(movieIdString)) {
                return Promise.reject(Error("Movie is already in favorites list."));
            } else {
                const todayYear = new Date().getFullYear();
                const todayMonth = new Date().getMonth();
                const todayDay = new Date().getDate();
                movie.addedAt = ''.concat(todayYear, "-", todayMonth + 1, "-", todayDay);
                fs.appendFileSync('./favoritos.txt', JSON.stringify(movie) + '\r\n');
                return Promise.resolve(movie);
            }
        },
        (err) => { return err }
    )
}
exports.getFavs = async function () {
    let myPromise = new Promise(function (myResolve, myReject) {
        fs.readFile('./favoritos.txt', 'UTF-8', function (err, data) {
            if (!err) {
                var splitted = data.split("\r\n");
                var parsed = new Array;
                splitted.pop();
                splitted.forEach(movie => {
                    parsedMovie = JSON.parse(movie);
                    parsedMovie.suggestionForTodayScore = Math.floor(Math.random() * 100);
                    parsed.push(parsedMovie);
                });
                parsed.sort(function (a, b) { return a.suggestionForTodayScore - b.suggestionForTodayScore })
                myResolve(parsed);
            }
            else {
                myReject(Error(err));
            }
        })
    })
    return myPromise.then(
        (favs) => {return Promise.resolve(favs)},
        (err) => {return err}
    )
}