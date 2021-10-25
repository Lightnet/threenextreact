/*
  LICENSE: MIT
  Created by: Lightnet
*/

// import { PrismaClient } from '@prisma/client';
// works for client browser such as page and api folder
// does not work with component folder
var db;
//check for database exist varaible in global store file js.
// it to prevent creating another instances connections.
export function clientDB(client){
	//console.log("[[[=== CHECK DATABASE VAR ===]]]");
	if(!db){
		//console.log("[[[=== SET UP DATAABASE ===]]]");
		db= new client(); // import { PrismaClient } from '@prisma/client';
	}else{
		//console.log("[[[=== REUSED DATABASE VAR ===]]]");
	}
	return db;
}
//testing...
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