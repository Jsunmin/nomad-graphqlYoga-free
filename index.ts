import { ApolloServer, gql } from 'apollo-server';
import resolvers from './graphql/resolver';
import { schema } from './graphql/schemas'

const server = new ApolloServer({
    // schema: 사용자에게 보내거나 받을 data에 대한 정의 (data form 통신? 정의)
    schema,
    // typeDefs: gql`
    //     type JustResponse {
    //         code: String!
    //         message: String!
    //     }
    //     type Response {
    //         code: String!
    //         message: String!
    //         movie: Movie!
    //     }

    //     type Subscription {
    //         movieDelete: JustResponse!
    //     }

    //     type Movie {
    //         id: Int!
    //         title: String!
    //         rating: Float!
    //         summary: String!
    //         language: String!
    //         medium_cover_image: String!
    //     }
        
    //     type Query {
    //         movies(limit: Int, rating: Float): [Movie]!
    //         movie(id: Int!): Movie!
    //         suggestions(id: Int!): [Movie]!
    //         givemeError: String
    //     }

    //     type Mutation {
    //         addMovie(title: String!, rating: Int!): Response!
    //     }
    // `,
    // 요청을 처리(해석)하는 것 ~ query, mutation
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Graphql Server Running at ${url}`)
})

// query: 클라이언트가 정보를 받는 것 ~ !는 필수 표시 (읽기작업)
// mutation: 클라이언트가 data 정보를 변형하는 것 (쓰기작업)

// 기본적으로 4000 port 생성 & root 접속시 graphql playground 생성
// query 및 mutation은 POST로 이루어짐