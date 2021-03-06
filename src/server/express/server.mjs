/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://www.npmjs.com/package/connect-mongo
// https://expressjs.com/en/resources/middleware/session.html
// https://expressjs.com/en/5x/api.html

import chalk from 'chalk';
import http from 'http';
import express from "express";
//import dotEnv from 'dotenv';
//import bodyParser from 'body-parser';
import session  from 'express-session';
import routes from './routes.mjs';
import cors from "cors";
import fs from "fs";

//import MongoStore from 'connect-mongo';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

//import { networkInterfaces } from 'os';

const log = console.log;

// load .env var
//dotEnv.config();

//const SECRET = process.env.SECRET;
//console.log(SECRET)

const DATABASE_URL = process.env.DATABASE_URL;
//console.log("DATABASE_URL: ",DATABASE_URL)
/*
function getIPAddress() {
  // import { networkInterfaces } from 'os';
  var interfaces = networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}
*/
// https://www.npmjs.com/package/cors
/*
var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
*/
export function main(){
  //console.log("main ???")
  const app = express();

  //console.log(__dirname);
  //public | dist > folder
  app.use(express.static('public'))
  app.use(express.static('dist'));

  //console.log(process.env.PORT)
  //console.log(process.env.HOST) 
  //console.log(process.env.SECRET) 

  const PORT =  process.env.PORT || 3000;
  const HOST =  process.env.HOST || "0.0.0.0";

  //let db = await clientDB();
  //app.use(cors(corsOptions))
  app.use(cors())
  
  //app.set('trust proxy', 1) // trust first proxy
  //console.log('env.PORT', process.env.PORT)
  //console.log('env.HOST', process.env.HOST)

  app.set('PORT', PORT)
  app.set('HOST', HOST)

  app.use(session({
    secret: 'keyboard cat',
    //store: MongoStore.create({ mongoUrl: DATABASE_URL }),
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

  // parse application/x-www-form-urlencoded
  //app.use(bodyParser.urlencoded({ extended: false }))
  // parse application/json
  //app.use(bodyParser.json())
  app.use(express.json())

  let filecss = path.join(__dirname,"../../../styles/global.css")
  const cssdata = fs.readFileSync(filecss,{encoding:'utf8', flag:'r'});

  app.get('/global.css', (req, res) => {
    //res.contentType('text/css');
    //res.setHeader("Content-Type", 'text/css');
    //res.sendFile(filecss);
    res.writeHeader(200, {'Content-Type': 'text/css'});
    res.end(cssdata)
  })

  // Access the session as req.session
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../../../index.html"))
  })
/*
    res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>REACT App</title>
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script src="/bundle.js"></script>
  </body>
</html>`)
*/
  //Routes
  app.use(routes); 
  //const server = app.listen(app.get('PORT'), () => {
    //console.log(`Server app listening at http://localhost:${PORT}`)
  //})
  const server = http.createServer(app);
  console.log("PORT: ", app.get('PORT'))
  console.log("HOST: ", app.get('HOST'))

  if(app.get('HOST')){
    server.listen(app.get('PORT'),app.get('HOST'),()=>{
      //console.log('Init Server HOST PORT listen...')
    });
  }else{
    server.listen(app.get('PORT'),()=>{
      //console.log('Init Server PORT listen...')
    });
  }
  
  server.on('listening', function() {
    //let localhost = getIPAddress();
    //console.log(`IP address 0 on http://${localhost}:${PORT} <- Local host IP address machine`);
    //console.log(`IP address 1 on http://localhost:${PORT} <- Default for dev testing...`);
    //log("");
    log("IP address on "+chalk.green(`http://localhost:${PORT} `) + chalk.red('Default for Dev Testing.'));
    //log("");
    //console.log(`IP address 2 on http://${HOST}:${PORT}`)// does not work but if "0.0.0.0" this will aollow outside access
    //console.log(`IP address 3 on http://127.0.0.1:${PORT}`);//does not work script // Content Security Policy 
    //console.log(`IP address 4 on http://localhost:${PORT}/ip <- IP Test`);
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
    //console.log("SERVER:: ",server.address())
  });

  // https://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
  /*
  process.on('exit',()=>{
    console.log("exit CLOSE?")
    server.close();
  })

  //catches ctrl+c event
  process.on('SIGINT',()=>{
    console.log( "SIGINT CLOSE?")
    server.close();
  })

  process.on('SIGTERM',()=>{
    console.log("SIGTERM CLOSE?")
    server.close();
  })

  //catches uncaught exceptions
  process.on('uncaughtException',()=>{
    console.log("uncaughtException CLOSE?")
    server.close();
  })
  */
  //console.log("end server set up?")
}

//main();
//export default main;