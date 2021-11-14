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

//import formidable from "formidable";
// you might want to use regular 'fs' and not a promise one
//import { promises as fs } from 'fs';
//import path from "path";

import formidable from "formidable-serverless";
import fs from "fs";
import { getSession } from "next-auth/react";
import db from "../../lib/database";

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {

  /*
  if (req.method === 'POST') {
    // Process a POST request
    res.status(200).json({ data: 'success' });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
  */

  const session = await getSession({ req });
  let userid;
  let username;

  if(session){
    if(!session.user.name){
      return res.json({error:"FAIL"});  
    }
    if(!session.user.token){
      return res.json({error:"FAIL"});  
    }

    if(session.user.token){
      const User = db.model('User');
      const user = await User.findOne({username: session.user.name}).exec();
      if(typeof session.user.token == "string"){
        //console.log("STRING DATA...");
        if(user){
          //console.log("FOUND???");
          let bcheck = user.checkToken(session.user.token);
          console.log("TOKEN: ", bcheck);
          //console.log(user);
          if(bcheck){
            // pass
            log('PASS TOKEN');
            userid = user._id;
            username = user.username;
          }else{
            log('FAIL TOKEN');
            return res.json({error:"FAIL"});
          }
        }else{
          return res.json({error:"FAIL"});
        }
      }
    }
  }else{
    return res.json({error:"FAIL"});
  }
  
  // parse form with a Promise wrapper
  //const data = await new Promise(async (resolve, reject) => {
  return new Promise(async (resolve, reject) => {
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true
    });
    form
      .on("file", (name, file) => {
        const data = fs.readFileSync(file.path);
        console.log(file.path);
        console.log(data);
        //need create folder else it error out dir fail create.
        fs.writeFileSync(`public/upload/${file.name}`, data);
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