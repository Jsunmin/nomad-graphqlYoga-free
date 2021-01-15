import { ApolloServer } from 'apollo-server';
import { schema } from './nexus/nexus';
import { createContext } from './graphql/context';
// import Prisma from './prisma/prisma';

const server = new ApolloServer({
  // schema: 사용자에게 보내거나 받을 data에 대한 정의 (data form 통신? 정의)
  //   | typeDefs and resolvers (둘 다 필수값) 들을 사용자가 제시해주면, apolloserver가 알아서 schema를 만들어줌
  schema,
  // 여러 resolver에서 활용 가능한 공용 변수나 로직을 위한 객체 ~ 객체 또는 객체생성함수 가능
  // context: {prisma: Prisma.getInstance()},
  context: createContext,
});

server.listen().then(({ url }) => {
  console.log(`Graphql Server Running at ${url}`);
});

// query: 클라이언트가 정보를 받는 것 ~ !는 필수 표시 (읽기작업)
// mutation: 클라이언트가 data 정보를 변형하는 것 (쓰기작업)

// 기본적으로 4000 port 생성 & root 접속시 graphql playground 생성
// query 및 mutation은 POST로 이루어짐
