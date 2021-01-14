// 런타임시, PrismaClient를 통해 db를 접속한다
// cli를 통해 data migration이 진행되었다면, npx prisma generate로 cleint에도 변경된 내용을 적용시켜줘야 한다.
import { PrismaClient } from '@prisma/client';

// generate singleton
export default class Prisma {
  private static prisma: PrismaClient;

  private constructor() { }

  static getInstance(): PrismaClient {
    if (!Prisma.prisma) {
      Prisma.prisma = new PrismaClient();
    }
    return Prisma.prisma;
  }
}
