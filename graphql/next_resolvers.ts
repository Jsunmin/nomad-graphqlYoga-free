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
    t.field("movies", {
      type: nonNull(list("Movie")),
      args: {
        limit: intArg(),
        rating: floatArg(),
      },
      resolve: (_, { limit, rating }) => getMovies(limit, rating), // arr 리턴
    });
    t.field("movie", {
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
        console.log('resolve not work')
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
    t.field("addMovie", {
      type: nonNull("Response"),
      args: {
        title: nonNull(stringArg()),
        rating: nonNull(intArg()),
      },
      resolve: async function (_, { title, rating }) {
        try {
          const msg = await sleep('sleep msg~ ', 2000);
          console.log("sending payload");
          pubsub.publish(pubsubMsg.DELETE, {
            movieDelete: {
              code: "200",
              message: "hello subscriber!!",
            },
          });
          console.log(msg, 'go!');
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
    });
  },
});

export const Subscription = subscriptionType({
  definition(t) {
    t.field("movieDelete", {
      type: nonNull("JustResponse"),
      async subscribe() {
        console.log("check??!");
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

async function sleep(msg, ms) {
  return new Promise(function(resolve, reject) {
    return setTimeout(() => {
      console.log('here! msg:');
      resolve(msg);
    }, ms);
  });
}