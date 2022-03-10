/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import middleware from 'middleware/middleware'
//import nextConnect from 'next-connect'
// https://vercel.com/docs/concepts/functions/edge-functions#middleware
// https://vercel.com/guides/using-express-with-vercel#next.js
// https://github.com/vercel/next.js/discussions/11634
// https://gist.github.com/agmm/da47a027f3d73870020a5102388dd820
// https://morioh.com/p/c7ad109c8fd4
// https://stackoverflow.com/questions/60465564/create-upload-files-api-in-next-js
// https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/

import formidable from 'formidable';
import fs from "fs";
import path from "path";

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { log } from '../../lib/log';

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {

  const session = await getSession({ req })
  //log("session:", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //log(error);
  //log(userid);
  //log(username);
  if(error){
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();

  /*
  if (req.method === 'POST') {
    // Process a POST request
    res.status(200).json({ data: 'success' });
  }
  */

  var extfile=[
    'jpg'
  , 'js'
  , 'png'
  , 'gif'
  , 'txt'
  , 'txt'
  ]

  // parse form with a Promise wrapper
  //const data = await new Promise(async (resolve, reject) => {
  return new Promise(async (resolve, reject) => {
    const form = formidable.IncomingForm();
    /*
    form.parse(req, (err, fields, files) => {
      if (err) {
        //next(err);
        reject(res.status(500).send('Aborted'));
        return;
      }
      log(fields);
      log(files);
      //res.json({ fields, files });
      resolve(res.status(200).send('done'));
    });
    */


    /*
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true
    });
    form
      .on("file", async (name, file) => {
        const data = fs.readFileSync(file.path);
        //log("name: ", name); //   <input name="[file]" type="file" />
        //log("file.path: ", file.path);
        //log("ext: ", path.extname(file.path));
        //log("file: ", file.name);
        //log(data);
        //log(data.toString('base64'));

        let datafile = file.name.split(".");

        const ObjectData = db.model('ObjectData');

        let objectData = new ObjectData({
          userid:userid,
          name:datafile[0],
          datatype:datafile[1],
          data:data.toString('base64')
        })
        await objectData.save();
        //let saveObjectData = await objectData.save();
        //log("saveObjectData: ",saveObjectData);

        if(path.extname(file.path)){
          log("FOUND EXT.")
        }else{
          log("NOT FOUND EXT.")
        }
        fs.unlinkSync(file.path);
      })
      .on("aborted", () => {
        log("Aborted...");
        reject(res.status(500).send('Aborted'));
      })
      .once("end", () => {
        log("Done!");
        resolve(res.status(200).send('done'));
      });
    
    await form.parse(req);
    */
  });

  res.status(200).json({ name: 'John Doe' })
}