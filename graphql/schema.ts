import {
  makeSchema,
  objectType,
  subscriptionType,
  queryType,
  mutationType,
  stringArg,
  list,
  nonNull,
  floatArg,
  intArg,
} from "nexus";
import { join } from "path";

const JustResponse = objectType({
  name: "JustResponse",
  definition(t) {
    t.nonNull.string("code")!;
    t.nonNull.string("message")!;
  },
});

const Response = objectType({
  name: "Response",
  definition(t) {
    t.nonNull.string("code")!;
    t.nonNull.string("message")!;
    // 체크! movie 연결
    t.nonNull.field("movie", {
      type: "Movie",
    })!;
  },
});

const Subscription = subscriptionType({
  definition(t) {
    t.field("movieDelete", {
      type: nonNull("JustResponse"),
      subscribe() {
        console.log("check??!");
      },
      resolve(eventData) {
        return eventData;
      },
    });
  },
});

const Movie = objectType({
  name: "Movie",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("title");
    t.nonNull.float("rating");
    t.nonNull.string("summary");
    t.nonNull.string("language")!;
    t.nonNull.string("medium_cover_image")!;
  },
});

const Query = queryType({
  definition(t) {
    t.field("movies", {
      type: nonNull(list("Movie")),
      args: {
        limit: nonNull(stringArg()),
        rating: nonNull(floatArg()),
      },
    });
    t.field("movie", {
      type: nonNull("Movie"),
      args: {
        id: nonNull(intArg()),
      },
    });
    t.field("suggestions", {
      type: nonNull(list("Movie")),
      args: {
        id: nonNull(intArg()),
      },
    });
    t.field("givemeError", {
      type: "String",
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.field("addMovie", {
      type: nonNull("Response"),
      args: {
        title: nonNull(stringArg()),
        rating: nonNull(intArg()),
      },
    });
  },
});

makeSchema({
  types: [JustResponse, Response, Movie, Query, Mutation, Subscription],
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});
