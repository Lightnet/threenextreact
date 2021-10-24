
// https://flaviocopes.com/nextjs-fix-prismaclient-unable-run-browser/
// https://github.com/prisma/prisma/issues/6219
// https://githubmemory.com/repo/prisma/prisma-client-js/issues/956
// https://github.com/prisma/prisma-examples/blob/latest/typescript/rest-nextjs-api-routes-auth/lib/prisma.ts

//does not work

import { PrismaClient } from '@prisma/client';

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma