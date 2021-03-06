/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
//import formidable from "formidable";
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import clientDB, { expressSessionTokenCheck } from '../../../../../lib/database.mjs';
import { isEmpty } from '../../../../../lib/helper.mjs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadFolder = path.join(__dirname, "../../../../public", "files");
const router = express.Router();

router.get('/assets', async function (req, res) {

  const {error, userid, username} = await expressSessionTokenCheck(req.session);
  //console.log(error)
  //console.log(userid)
  //console.log(username)
  if(error){
    //console.log("Error! session check...");
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
    //console.log("Error! session check...");
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
      //console.log(e);
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
    //console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Asset = db.model('Asset');

  if(api=="DELETE"){
    try{
      let data = req.body;
      let assets = await Asset.findOne({id:data.id})
        .select('id projectid filename filetype filepath')
        .exec();
      //console.log(assets)
      if(assets){
        await Asset.deleteOne({id:data.id}).exec();
        //need to delete file data either on server database or local...
        // delete public filed > name < path c:/path/project/public/files
        fs.unlinkSync( assets.filepath )
        return res.json({
          api:'DELETE'
          , id:data.id
        });
      }else{
        return res.json({error:"FAIL! Empty Asset!"});
      }
    }catch(e){
      //console.log(e);
      return res.json({error:"FAIL! Get Assets!"});
    }
  }else{
    return res.json({error:"Fail Assets"})
  }
})

// https://stackoverflow.com/questions/7109732/express-setting-content-type-based-on-path-file
router.get('/assets/:filename', async function (req, res) {

  const {error, userid, username} = await expressSessionTokenCheck(req.session);
  //console.log(error)
  //console.log(userid)
  //console.log(username)
  if(error){
    //console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Asset = db.model('Asset');

  //console.log("KEY?", req.params.filename)
  let filename = req.params.filename;

  if(isEmpty(filename)){
    return res.json({error:"empty file"});
  }

  let asset = await Asset.findOne({filename: filename})
    .select('id projectid filename filetype filepath')
    .exec();
  //console.log(asset);
  
  if(asset){
    // https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
    //const mimetype = mime.lookup(asset.filename);
    //const data = fs.readFileSync(asset.filepath, {encoding:'utf8'})
    const data = fs.readFileSync(asset.filepath)

    res.contentType(asset.filename);
    //res.setHeader('Content-type', mimetype);
    res.send(data);
    //return res.end(data);

  }else{
    return res.json({error:"Not found"});
  }
  //return res.json(asset)
})

export default router;