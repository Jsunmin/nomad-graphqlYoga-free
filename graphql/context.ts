import { PrismaClient } from '@prisma/client';
import { ServerResponse, IncomingMessage } from 'http';
import Prisma from '../prisma/prisma';

interface Ctx {
    prisma: PrismaClient
}

// playground에 떠있으면, 계속 실행됨 -> 클라이언트 호출마다 계속 실행된다!
export function createContext({ req, res }: {req: IncomingMessage, res: ServerResponse}): Ctx {
    console.log('create context from : ', req.headers.host);
    const prisma = Prisma.getInstance();
    const contect: Ctx = { prisma };
    return contect;
}