let movies = [{
    id: 0,
    name: 'Start Wars - The new one',
    score: 28,
}, {
    id: 1,
    name: 'Avengers - The new one',
    score: 8,
}, {
    id: 2,
    name: 'The Godfather I',
    score: 12,
}, {
    id: 3,
    name: 'HarryPorter III',
    score: 18,
}, {
    id: 4,
    name: 'Load of the Rings',
    score: 23,
}];
// 이제는 기본적으로 query { people { name } } 으로 들어감

export const getMovies = () => movies;

export const getById = id => {
    const filteredMovies = movies.filter(p => p.id === id);
    return filteredMovies[0];
}

export const deleteMovie = id => {
    const cleanedMovies = movies.filter(p => p.id !== id);
    if ( cleanedMovies.length < movies.length ) {
        movies = cleanedMovies;
        return true;
    } else {
        return false;
    }
}

export const addMovie = (name, score) => {
    const newMovie = {
        id: movies.length,
        name,
        score,
    };
    movies.push( newMovie );
    return newMovie;
}