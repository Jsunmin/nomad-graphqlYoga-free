import { ApolloServer } from 'apollo-server';
import { schema } from './graphql/next'

const server = new ApolloServer({
    // schema: 사용자에게 보내거나 받을 data에 대한 정의 (data form 통신? 정의)
    schema,
});

server.listen().then(({ url }) => {
    console.log(`Graphql Server Running at ${url}`)
})

// query: 클라이언트가 정보를 받는 것 ~ !는 필수 표시 (읽기작업)
// mutation: 클라이언트가 data 정보를 변형하는 것 (쓰기작업)

// 기본적으로 4000 port 생성 & root 접속시 graphql playground 생성
// query 및 mutation은 POST로 이루어짐