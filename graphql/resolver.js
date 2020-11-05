import { getMovies, getMovie, getSuggestions } from "./db";


// query를 resolve 하는 것 (해석?!)
const resolver = {
    Query: {
        movies: (_, { limit, rating }) => getMovies(limit, rating), // arr 리턴
        movie: (_, { id }) => getMovie(id),
        suggestions: (_, { id }) => getSuggestions(id),
    }
}

export default resolver;

/*
# Write your query or mutation here
query {
	movies(limit: 10, rating: 6) {
        id
        rating
    }
}
query {
    movie(id:23113) {
        id
        title
    }
}
query {
    movie(id:23113) {
        id
        title
    }
    suggestions(id:23113) {
        title
        rating
    }
} // REST API에서는 클라이언트에서 2번의 통신으로 가져온 데이터를, graphql을 통해 한번의 통신으로 2개의 쿼리를 가져올 수 있다.

mutation {
    addMovie(name: "test", score: 999) { 
        name
    } // movie! - 반드시 리턴함으로 리턴까지 받아야 함 ~ 생성 결과도 받을 수 있다!
}
*/