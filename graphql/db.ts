import axios from 'axios';
import Prisma from '../prisma/prisma';

const BASE_URL = "https://yts.mx/api/v2/";
const LIST_MOVIES_URL = `${BASE_URL}list_movies.json`;
const MOVIE_DETAILS_URL = `${BASE_URL}movie_details.json`;
const MOVIE_SUGGESTIONS_URL = `${BASE_URL}movie_suggestions.json`;

// mutation용
export const addMovie = async (title: string, rating: number) => {
    const prisma = Prisma.getInstance();
    const newMovie = await prisma.movie.create({
        data: {
            title,
            rating,
            summary: 'this is dummy data!',
            language: 'this is dummy data!',
            medium_cover_image: 'this is dummy data!',
        }
    });
    return newMovie;
}
export const getMovies = async (limit: number, rating: number) => {
    const prisma = Prisma.getInstance();
    const [{
        data: {
            data: { movies }
        }
    } , fromDB] = await Promise.all([
        axios(LIST_MOVIES_URL, {
            params: {
                limit,
                minimum_rating: rating,
            }
        }),
        prisma.movie.findMany()
    ]);
    return [...fromDB, ...movies];
}

export const getMovie = async (id: number) => {
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

export const getSuggestions = async (id: number) => {
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
