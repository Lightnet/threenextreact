/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
//import { v4 as uuidv4 } from 'uuid';
import { nanoid32 } from '../helper';

var BlankSchema = new mongoose.Schema({
  id: {
    type:String,
    //default: uuidv4
    default: nanoid32
  },
  userid: String,
  username: String,
  date:{
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Blank', BlankSchema );