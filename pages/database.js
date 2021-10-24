/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from '@prisma/client';

//declare {
  //var prisma;
//}

export const prisma = global.prisma || new PrismaClient();
    //log: ['query'],
  
/*
export const prisma =
  global.prisma ||
  new PrismaClient({
    //log: ['query'],
  });
*/
//if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
// https://stackabuse.com/using-global-variables-in-node-js/
//import { PrismaClient } from '@prisma/client'
//let prisma = new PrismaClient()
//export default prisma

//Typescript
// add prisma to the NodeJS global type
//interface CustomNodeJsGlobal extends NodeJS.Global {
  //prisma: PrismaClient
//}
// Prevent multiple instances of Prisma Client in development
//declare const global: CustomNodeJsGlobal
//
//var prisma = global.prisma || new PrismaClient();
//if (process.env.NODE_ENV === 'development') global.prisma = prisma;
//export default prisma;