# What is Prisma's role in a GraphQL server?

No matter which of the above GraphQL tools/libraries you use, Prisma is used inside your GraphQL resolvers to connect to your database.

# Prisma provides:

Query: Send queries to your database
Migrate: Perform schema migrations in your database
Introspect: Read a database schema and translate into Prisma data model
Schema: Construct and modify a Prisma schema file
Generate: Generate clients for Prisma data sources

# 순서

1, prisma.schema 작성 ~ datasource, generator..
2, prisma migrate ~ 작성 코드 기반으로 디비 스키마 마이그레이션
3, prisma generate ~ 작성 코드 기반으로 에플리케이션에 활용 - 제공되는 쿼리 메서드 통해! (ft. prisma/client)
4,
