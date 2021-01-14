import { getMovies, getMovie, getSuggestions, addMovie } from "./db";
import {
  UserInputError,
  AuthenticationError,
  ApolloError,
  PubSub,
} from "apollo-server";

const pubsub = new PubSub();
const pubsubMsg = {
  DELETE: "DELETE",
  POST: "POST",
};
interface SuccessResopnse {
  code: string;
  message: string;
  movie: object;
};

// 연결테스트!
// setInterval(() => {
//   console.log("sending payload");
//   pubsub.publish(pubsubMsg.DELETE, {
//     movieDelete: {
//       code: "400",
//       message: "hello subscriber!!",
//     },
//   });
// }, 2000);


// query를 resolve 하는 것 (해석?!)
const resolver = {
  /* 총 4개의 인수 (parent, args, context, info)를 갖는데,
    1, 해당 필드의 부모에 대한 반환값(리졸버 체인의 이전 단계)
      ~ 스키마 내부 스키마 .. 이어지는 데이터 구조시, 체이닝이 일어남(부모 data == 상위 블록 data)
    2, 필드에 제공된 모든 gql 인자 포함 개체 ( params )
    3, 특정 작업에 대해 실행중인 모든 리졸버에 공유되는 개체
      ~ 인증, db, 겟 등의 공용 정보 저장에 유용!
    4, 필드이름, 루트에서 
  */
  Query: {
    // 기본적인 query
    movies: (_, { limit, rating }) => getMovies(limit, rating), // arr 리턴
    movie: (_, { id }) => getMovie(id),
    suggestions: (_, { id }) => getSuggestions(id),
    // 에러 처리
    givemeError: () => {
      console.log('resolve not work intentionally')
      try {
        throw "hello~";
      } catch (err) {
        console.log(err);
        // 사용자정의
        throw new ApolloError("ttt", "abc", { a: 123123 });
        // 권한
        throw new AuthenticationError(err);
        // parameter
        throw new UserInputError(err);
      }
    },
  },
  Mutation: {
    addMovie: function (_, { title, rating }) {
      try {
        const newMovie = addMovie(title, rating);
        const res: SuccessResopnse = {
          code: "200",
          message: "new movie creation success",
          movie: newMovie,
        };
        return res;
      } catch (err) {
        console.log(err);
      }
    },
  },
  Subscription: {
    movieDelete: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([pubsubMsg.DELETE]),
    },
  },
};

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
