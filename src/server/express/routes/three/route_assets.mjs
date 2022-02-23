/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
//import formidable from "formidable";
//import fs from "fs";
//import path, { dirname } from 'path';
//import { fileURLToPath } from 'url';
import clientDB, { expressSessionTokenCheck } from '../../../../../lib/database.mjs';
import { isEmpty } from '../../../../../lib/helper.mjs';
//const __dirname = dirname(fileURLToPath(import.meta.url));
//const uploadFolder = path.join(__dirname, "../../../../public", "files");

const router = express.Router();

router.get('/assets', async function (req, res) {

  const {error, userid, username} = await expressSessionTokenCheck(req.session);
  //console.log(error)
  //console.log(userid)
  //console.log(username)
  if(error){
    console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Asset = db.model('Asset');
  let assets = await Asset.find()
    .select('id projectid filename filetype')
    .exec();
  return res.json(assets)
})

router.post('/assets', async function (req, res) {
  const {api} = req.body;
  if(isEmpty(api)){
    return res.json({error:"FAIL"});
  }

  const {error, userid, username} = await expressSessionTokenCheck(req.session);
  //console.log(error)
  //console.log(userid)
  //console.log(username)
  if(error){
    console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Asset = db.model('Asset');

  if(api=="ASSETS"){
    try{
      let data = req.body;
      let assets = await Asset.find({projectid:data.projectid})
      .select('id projectid filename filetype')
      .exec();
      return res.json({
        api:'ASSETS'
        , assets:assets
      });
    }catch(e){
      console.log(e);
      return res.json({error:"FAIL! Get Assets!"});
    }
  return res.json(assets)
  }else{
    return res.json({error:"Fail Assets"})
  }
})

router.delete('/assets', async function (req, res) {
  const {api} = req.body;
  if(isEmpty(api)){
    return res.json({error:"FAIL"});
  }

  const {error, userid, username} = await expressSessionTokenCheck(req.session);
  //console.log(error)
  //console.log(userid)
  //console.log(username)
  if(error){
    console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Asset = db.model('Asset');

  if(api=="DELETE"){
    try{
      let data = req.body;
      let assets = await Asset.find({id:data.id})
        .select('id projectid filename filetype')
        .exec();
      console.log(assets)
      if(assets.length>=1){

        await Asset.deleteOne({id:data.id}).exec();

        //need to delete file data

        return res.json({
          api:'DELETE'
          , id:data.id
        });
      }else{
        return res.json({error:"FAIL! Empty Asset!"});
      }
    }catch(e){
      console.log(e);
      return res.json({error:"FAIL! Get Assets!"});
    }
  }else{
    return res.json({error:"Fail Assets"})
  }
})

export default router;