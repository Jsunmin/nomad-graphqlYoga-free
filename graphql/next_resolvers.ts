import { getMovies, getMovie, getSuggestions, addMovie } from "./db";
import {
  subscriptionType,
  queryType,
  mutationType,
  stringArg,
  list,
  nonNull,
  floatArg,
  intArg,
} from "nexus";
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
pubsub.subscribe(pubsubMsg.DELETE, (a) => {
  console.log(a, 'sub work?!')
})
interface SuccessResopnse {
  code: string;
  message: string;
  movie: object;
};

export const Query = queryType({
  definition(t) {
    t.crud.movie()
    t.crud.movies()
    t.field("getmovies", {
      type: nonNull(list("Movie")),
      args: {
        limit: intArg(),
        rating: floatArg(),
      },
      resolve: (_, { limit, rating }: {limit: number, rating: number}) => getMovies(limit, rating), // arr 리턴
    });
    t.field("getmovie", {
      type: nonNull("Movie"),
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }) => getMovie(id),
    });
    t.field("suggestions", {
      // resolve(),
      type: nonNull(list("Movie")),
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, { id }) => getSuggestions(id),
    });
    t.field("givemeError", {
      type: "String",
      resolve: () => {
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
    });
  },
});

export const Mutation = mutationType({
  definition(t) {
    // using prisma-nexus
    t.crud.createOneMovie();
    t.crud.deleteOneMovie();
    t.crud.updateOneMovie();
    // using nexus
    t.field("addMovie", {
      type: nonNull("Response"),
      args: {
        title: nonNull(stringArg()),
        rating: nonNull(intArg()),
      },
      resolve: async function (_, { title, rating }) {
        try {
          console.log("sending payload");
          pubsub.publish(pubsubMsg.DELETE, {
            movieDelete: {
              code: "200",
              message: "hello subscriber!!",
            },
          });
          const newMovie = await addMovie(title, rating);
          const res: SuccessResopnse = {
            code: "200",
            message: "new movie creation success",
            movie: newMovie,
          };
          return res;
        } catch (err) {
          console.log(err);
          throw new ApolloError(err.message, "500", { err });
        }
      },
    });
  },
});

export const Subscription = subscriptionType({
  definition(t) {
    t.field("movieDelete", {
      type: nonNull("JustResponse"),
      async subscribe() {
        console.log("sub setting on!");
        const test = await pubsub.asyncIterator(pubsubMsg.DELETE);
        console.log(test);
        return test;
      },
      resolve(eventData: { movieDelete: { code: string, message: string }}, _args, _ctx, _info) {
        // evnetdata = key: 퍼블리싱된 토픽 value: 토픽의 payload로 구성!!
        console.log(typeof eventData, eventData, 'resolve??!')
        return eventData.movieDelete;
      },
    });
  },
});

async function sleep(msg: string, ms: number) {
  return new Promise(function(resolve, reject) {
    return setTimeout(() => {
      console.log('here! msg:');
      resolve(msg);
    }, ms);
  });
}