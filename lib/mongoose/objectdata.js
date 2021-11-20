/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper';

const Schema = mongoose.Schema;
var ObjectDataSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  name: String,
  assetid:{
    type: String,
    default: ''
  },
  editorid:{
    type: String,
    default: ''
  },
  dataid:{
    type: String,
    default: ''
  },
  data:{
    type: String,
    default: ''
  },
  datatype:{
    type: String,
    default: ''
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('ObjectData', ObjectDataSchema );