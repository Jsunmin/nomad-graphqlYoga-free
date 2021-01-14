import {
  objectType,
} from "nexus";

export const JustResponse = objectType({
  name: "JustResponse",
  definition(t) {
    t.nonNull.string("code");
    t.nonNull.string("message");
  },
});

export const Response = objectType({
  name: "Response",
  definition(t) {
    t.nonNull.string("code");
    t.nonNull.string("message");
    // 체크 movie 연결
    t.nonNull.field("movie", {
      type: "Movie",
    });
  },
});

export const Movie = objectType({
  name: "Movie",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.rating();
    t.model.summary();
    t.model.language();
    t.model.medium_cover_image();
  },
});