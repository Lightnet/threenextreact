/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

//Require Mongoose
import mongoose from 'mongoose';
import crypto from 'crypto';

// crypto 
import jwt from 'jsonwebtoken';
import { nanoid32, unixTime } from '../helper';
var secret = process.env.SECRET;

//Define a schema
//var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
  id: {
    type:String,
    default: nanoid32
  },
  username: String,
  passphrase: String,
  email: {
    type:String,
    default:''
  },
  token:  {
    type:String,
    default:''
  },
  bio: {
    type:String,
    default:''
  },
  image: {
    type:String,
    default:''
  },
  hash: {
    type:String,
    default:''
  }, //password
  salt: {
    type:String,
    default:''
  }, //auto gen password key
  groups: {
    type:String,
    default:''
  },
  access: {
    type:String,
    default:'USER'
  },
  role: {
    type:String,
    default:'USER'
  },
  isBan: {
    type:String,
    default:''
  },
  date: {
    type:Number,
    default:unixTime
  }
}, {timestamps: true});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
}

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  return jwt.sign({
    id: this._id,
    name: this.username,
    exp: parseInt(exp.getTime() / 1000),
    }, secret);
}

UserSchema.methods.toAuthJSON = function(){
  return {
    name: this.username
    //, email: this.email
    , token: this.generateJWT()
    //, bio: this.bio
    //, image: this.image
  };
}

UserSchema.methods.checkToken = function(token){
  // invalid token - synchronous
  try {
    //var decoded = jwt.verify(token, 'wrong-secret');//check fail
    var decoded = jwt.verify(token, secret);
    if(decoded){
      return true;
    }else{
      return false;
    }

  } catch(err) {
    // err
    return false;
  }
}
export default UserSchema;
// Compile model from schema
//mongoose.model('User', UserSchema );

//var User = mongoose.model('User', UserSchema );
//export default User;

// user.validPassword(password)