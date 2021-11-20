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

import formidable from "formidable-serverless";
import fs from "fs";
import path from "path";

import { getSession } from "next-auth/react";
import db,{ sessionTokenCheck } from "../../lib/database";

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {

  const session = await getSession({ req })
  //console.log("session:", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

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
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true
    });
    form
      .on("file", async (name, file) => {
        const data = fs.readFileSync(file.path);
        //console.log("name: ", name); //   <input name="[file]" type="file" />
        //console.log("file.path: ", file.path);
        //console.log("ext: ", path.extname(file.path));
        //console.log("file: ", file.name);
        //console.log(data);
        //console.log(data.toString('base64'));

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
        //console.log("saveObjectData: ",saveObjectData);

        if(path.extname(file.path)){
          console.log("FOUND EXT.")
        }else{
          console.log("NOT FOUND EXT.")
        }

        //if(name=='file'){
          //reject(res.status(500).send('Aborted'));
          //return;
        //}
        //need create folder else it error out dir fail create.
        //fs.writeFileSync(`public/upload/${file.name}`, data);
        fs.unlinkSync(file.path);
      })
      .on("aborted", () => {
        console.log("Aborted...");
        reject(res.status(500).send('Aborted'));
      })
      .once("end", () => {
        console.log("Done!");
        resolve(res.status(200).send('done'));
      });
    
    await form.parse(req);
  });
    //console.log("data")
    //console.log(data);

  //console.log(data.fields.file);

  //const contents = await fs.readFile(data?.fields?.file, {
    //encoding: 'utf8',
  //})
  //console.log(contents);

  // read file from the temporary path
  //const contents = await fs.readFile(data?.files?.nameOfTheInput.path, {
    //encoding: 'utf8',
  //})
  //console.log(contents);

  res.status(200).json({ name: 'John Doe' })
}