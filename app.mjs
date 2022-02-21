/*
  LICENSE: MIT
  Created by: Lightnet
*/
import dotEnv from 'dotenv';
import { main } from "./src/server/servertypes.mjs";

try {
  dotEnv.config();
  //console.log("PORT: ", process.env.PORT) 
}catch(e){
  console.log(e)
}
//import { main } from "./src/server/express/server.mjs";
//console.log(main)
try {
  main();
}catch(e){
  console.log(e)
}

//console.log(server);
//server.main();
//console.log("import app server")