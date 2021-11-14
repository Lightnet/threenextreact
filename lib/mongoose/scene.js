/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32, unixTime } from '../helper';

var SceneSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  userid: String,
  username: String,
  editorid: {
    type:String,
    default: ''
  },
  name: {
    type:String,
    default: ''
  },
  description: {
    type:String,
    default: ''
  },
  data: {
    type:String,
    default: ''
  },
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
mongoose.model('Scene', SceneSchema );