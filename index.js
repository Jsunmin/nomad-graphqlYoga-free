import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolver';

const server = new GraphQLServer({
    typeDefs: 'graphql/schema.graphql',
    resolvers,
});

server.start(() => console.log('Graphql Server Running'));

// schema: 사용자에게 보내거나 받을 data에 대한 정의
// query: 클라이언트가 정보를 받는 것 ~ !는 필수 표시
// mutation: 클라이언트가 정보를 변형하는 것

// 기본적으로 4000 port 생성 & root 접속시 graphql playground 생성
// query 및 mutation은 POST로 이루어짐