/*
  LICENSE: MIT
  Created by: Lightnet
  
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper.mjs';

const Schema = mongoose.Schema;
var EntitySchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  username: String,
  projectid: {
    type:String,
    default: ''
  },
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
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
mongoose.model('Entity', EntitySchema );
export default EntitySchema;