import { getMovies, getById, addMovie, deleteMovie } from "./db";


// query를 resolve 하는 것 (해석?!)
const resolver = {
    Query: {
        movies: () => getMovies(), // arr 리턴
        movie: (_, { id }) => {
            // client에서 주는 params는 2번째 args부터..
            return getById( id );
        },
    },
    Mutation: {
        addMovie: (_, { name, score }) => addMovie( name, score ),
        deleteMovie: (_, { id }) => deleteMovie( id )
    }
}

export default resolver;

/*
# Write your query or mutation here
query {
	movies {
        name
        score
    } // 전체 쿼리
}

query {
	movie(id: 0) {
        name
        score
    } // 필터 쿼리
}

mutation {
    deleteMovie(id: 5)
}
mutation {
    addMovie(name: "test", score: 999) { 
        name
    } // movie! - 반드시 리턴함으로 리턴까지 받아야 함 ~ 생성 결과도 받을 수 있다!
}
*/