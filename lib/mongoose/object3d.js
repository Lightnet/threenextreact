/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';
const Schema = mongoose.Schema;
var Object3DSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: ''
    //default: uuidv4
    default: nanoid32
  },
  userid: String,
  username: String,
  sceneid: {
    type:String,
    default: ''
  },
  name: {
    type:String,
    default: ''
  },
  datatype: {
    type:String,
    default: ''
  },
  data: Schema.Types.Mixed,
  access: {
    type:String,
    default: ''
  },
  isPublic: {
    type:Boolean,
    default: false
  },
  authors: [String],
  date:{
    type: Date,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Object3D', Object3DSchema );