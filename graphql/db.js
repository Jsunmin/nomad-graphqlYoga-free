import axios from 'axios';
const BASE_URL = "https://yts.mx/api/v2/";
const LIST_MOVIES_URL = `${BASE_URL}list_movies.json`;
const MOVIE_DETAILS_URL = `${BASE_URL}movie_details.json`;
const MOVIE_SUGGESTIONS_URL = `${BASE_URL}movie_suggestions.json`;

const dataForMutation = [];
// mutation용
export const addMovie = (title, rating) => {
    const newMovie = {
        id: dataForMutation.length,
        title,
        rating,
        summary: 'this is dummy data!',
        language: 'this is dummy data!',
        medium_cover_image: 'this is dummy data!',
    };
    dataForMutation.push( newMovie );
    console.log(dataForMutation)
    return newMovie;
}
export const getMovies = async (limit, rating) => {
    const {
        data: {
            data: { movies }
        }
    } = await axios(LIST_MOVIES_URL, {
        params: {
            limit,
            minimum_rating: rating,
        }
    });
    return [...dataForMutation, ...movies];
}

export const getMovie = async (id) => {
    const {
        data: {
            data: { movie }
        }
    } = await axios(MOVIE_DETAILS_URL, {
        params: {
            movie_id: id,
        }
    });
    return movie;
}

export const getSuggestions = async (id) => {
    const {
        data: {
            data: { movies }
        }
    } = await axios(MOVIE_SUGGESTIONS_URL, {
        params: {
            movie_id: id,
        }
    });
    return movies;
}
