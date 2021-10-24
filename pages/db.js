/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://www.youtube.com/watch?v=FMnlyi60avU&t=556s
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
// https://github.com/prisma/prisma/issues/5103
// https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
// https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162

//import { PrismaClient } from '@prisma/client';
//works for client browser
var db;
export function clientDB(client){
	console.log("database===]]]]]]]]]]]]]]]]]]]");
	if(!db){
		console.log("set up database===]]]]]]]]]]]]]]]]]]]");
		db= new client(); // import { PrismaClient } from '@prisma/client';
	}else{
		console.log("reuse database===]]]]]]]]]]]]]]]]]]]");
	}
	return db;
}

export function getDB(){
	return db;
}

/*
let prisma

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
}
// `stg` or `dev`
else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}

	prisma = global.prisma
}

export default prisma
*/