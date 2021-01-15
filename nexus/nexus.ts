import { join } from "path";
import { makeSchema } from "nexus";
import { nexusPrisma } from 'nexus-plugin-prisma'
import PrismaClient from '../prisma/prisma';
import * as schemas from './nexus_schemas';
import * as resolvers from './nexus_resolvers';
// Nexus에서는 스키마와 리졸버가 항상 함께 정의됩니다. Nexus를 사용하면 모든 것을 공통 언어로 작성할 수 있습니다.
// 이를 통해 코 로케이션 / 컨텍스트 전환 문제를 모두 회피 할 수 있으며 애플리케이션이 상당히 커지더라도 생산성을 높일 수 있습니다.


export const schema = makeSchema({
    types: [schemas, resolvers],
    outputs: {
      typegen: join(__dirname, "..", "nexus-typegen.ts"),
      schema: join(__dirname, "..", "schema.graphql"),
    },
    plugins: [ nexusPrisma({
      experimentalCRUD: true,
      prismaClient: PrismaClient.getInstance,
    }) ]
  });