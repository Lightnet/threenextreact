// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
// https://stackoverflow.com/questions/24100119/mongoose-connection-events-with-createconnection
// https://stackoverflow.com/questions/44191196/mongoose-create-a-user-schema-and-todo-schema
// https://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module
//
// https://stackoverflow.com/questions/10987444/how-to-use-global-variable-in-node-js
//
// NEXT API DATABASE
// https://next-auth.js.org/adapters/mongodb

//Import the mongoose module

import mongoose from 'mongoose';
import UserSchema from './mongoose/user.mjs';
import ProjectSchema from './mongoose/project.mjs';
import SceneSchema from './mongoose/scene.mjs';
import EntitySchema from './mongoose/entity.mjs';
import AssetSchema from './mongoose/asset.mjs';
import { log } from './log.mjs';
//import UserSchema from './mongoose/user.mjs';

//Set up default mongoose connection
//var mongoDB = 'mongodb://127.0.0.1/my_database';
var mongoDB = process.env.DATABASE_URL || 'mongodb://127.0.0.1/reactthree';
//log(mongoDB)

var db;

export default async function clientDB(){

  if(db){
    //log("LOCAL REUSED")
    return db;
  }

  if(global.db){
    //log("GLOBAL REUSED")
    return global.db;
  }

  //log("init DB")
  try{
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.model('User', UserSchema)
    mongoose.model('Project', ProjectSchema)
    mongoose.model('Scene', SceneSchema)
    mongoose.model('Entity', EntitySchema)
    mongoose.model('Asset', AssetSchema)
    
    //mongoose.model('Object3d', Object3dSchema)
  }catch(e){
    log(e);
  }
  //Get the default connection
  db = mongoose.connection;
  //Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', err => {
    log(`DB connected`);
  })
  db.on('connected', () => {
    log('connected to mongodb');
  });
  db.on('disconnected', () => {
    log('connection disconnected');
  });
  
  global.db = db;
  return db;
}

export async function sessionTokenCheck(session){
  return new Promise( async (resolve, reject) => {
    if(session){
      if(!session.user.name){
        resolve({error:"FAIL",userid:null,username:null});
      }
      if(!session.user.token){
        resolve({error:"FAIL",userid:null,username:null});
      }

      if(session.user.token){
        const cdb = await clientDB();
        const User = cdb.model('User');
        const user = await User.findOne({username: session.user.name}).exec();
        if(typeof session.user.token == "string"){
          //log("STRING DATA...");
          if(user){
            //log("FOUND???");
            let bcheck = user.checkToken(session.user.token);
            //log("TOKEN: ", bcheck);
            //log(user);
            if(bcheck){
              // pass
              resolve({error:null,userid:user.id,username:user.username});
            }else{
              resolve({error:"FAIL",userid:null,username:null});
            }
          }else{
            resolve({error:"FAIL",userid:null,username:null});
          }
        }
      }
    }else{
      resolve({error:"FAIL",userid:null,username:null});
    }
  });
}

export async function expressSessionTokenCheck(session){
  return new Promise( async (resolve, reject) => {
    //log("session");
    //log(session);
    //log("session");
    if(session){
      if(!session.user){
        resolve({error:"FAIL",userid:null,username:null});
      }
      if(!session.token){
        resolve({error:"FAIL",userid:null,username:null});
      }

      if(session.token){
        const cdb = await clientDB();
        const User = cdb.model('User');
        const user = await User.findOne({username: session.user}).exec();
        if(typeof session.token == "string"){
          //log("STRING DATA...");
          if(user){
            //log("FOUND???");
            let bcheck = user.checkToken(session.token);
            //log("TOKEN: ", bcheck);
            //log(user);
            if(bcheck){
              // pass
              resolve({error:null,userid:user.id,username:user.username});
            }else{
              resolve({error:"FAIL",userid:null,username:null});
            }
          }else{
            resolve({error:"FAIL",userid:null,username:null});
          }
        }
      }
    }else{
      resolve({error:"FAIL",userid:null,username:null});
    }
  });
}
