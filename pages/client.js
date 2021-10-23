




// https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
// https://stackabuse.com/using-global-variables-in-node-js/
import { PrismaClient } from '@prisma/client'
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

var prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;