// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// https://stackoverflow.com/questions/24100119/mongoose-connection-events-with-createconnection
// https://stackoverflow.com/questions/44191196/mongoose-create-a-user-schema-and-todo-schema
// https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
//
// https://stackoverflow.com/questions/10987444/how-to-use-global-variable-in-node-js
//
//
//
// NEXT API DATABASE
// https://next-auth.js.org/adapters/mongodb

//Import the mongoose module
import mongoose from 'mongoose';

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1/my_database';

var db;

if(!db){
  console.log("init DB")
  mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  //Get the default connection
  db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', err => {
    console.log(`DB connected`);
  })
  db.on('connected', () => {
    console.log('connected to mongodb');
  });
  db.on('disconnected', () => {
    console.log('connection disconnected');
  });
  require('./mongoose/user');
  require('./mongoose/editor');
  require('./mongoose/scene');
  require('./mongoose/sceneobject');
  //require('./mongoose/permission');
  //require('./mongoose/settings');

  global.db = db;
}else{
  console.log("REUSE DB")
}

module.exports = db;