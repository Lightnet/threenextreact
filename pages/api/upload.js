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

import fs from "fs";
import formidable from 'formidable';
import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
//import { log } from '../../lib/log';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadFolder = path.join(__dirname, "../../public", "files");
console.log(uploadFolder);

export const config = {
  api: {
    bodyParser: false
  }
}

const isFileValid = (file) => {
  //const type = file.type.split("/").pop();
  //const type = file.mimetype.split("/").pop();
  const type = file.originalFilename.split(".").pop();
  //console.log("type")
  //console.log(type)
  const validTypes = [
    "jpg"
    , "jpeg"
    , "png"
    , "pdf"
    , "txt"
    , "md"
    , "js"
    , "zip"
    , "iso"
  ];
  console.log(validTypes.indexOf(type));
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

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
  
  if (req.method === 'POST') {
    const form = formidable({
      multiples: false
      , maxFileSize:50 * 1024 * 1024 // 5MB
      , uploadDir : uploadFolder
    });
    // Parsing
    form.parse(req, async (err, fields, files) => {
      //console.log(fields);
      //console.log(files);
      if (err) {
        console.log("Error parsing the files");
        console.log(err.message);
        return res.status(400).json({
          status: "Fail",
          message: "There was an error parsing the files",
          error: err,
        });
      }
      //console.log(files.myfiles.length)
      if(files.myfiles.length==1){
        //Single file
        //console.log("Single File")
        //console.log(fields);
        //console.log(fields.projectid[0]);
        
        const file = files.myfiles[0];
        //console.log(file);
        //console.log(file.filepath) // file store temporary and need to delete? permission to save of folder access?
        //console.log(file.originalFilename) 
        //console.log(file.mimetype) 
        const isValid = isFileValid(file)
        //console.log(isValid)
        if (!isValid) {
          // throes error if file isn't valid
          console.log("The file type is not a valid type")
          return res.status(400).json({
            status: "Fail",
            message: "The file type is not a valid type",
          });
        }
        // creates a valid name by removing spaces
        const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g, "-"));
  
        try {
          const Asset = db.model('Asset');
          //Asset.depopulate('data');
          let bfound=false;
          // check need to override files for re-edit upload model
          //let assets = await Asset.find({filename: fileName})
          let assets = await Asset.find({filename: fileName})
            .select('id projectid filename filetype')
            .exec();
          console.log("assets", assets);
          console.log("FOUND?", assets.length);
          if(assets.length>=1){
            bfound=true;
          }
  
          // renames the file in the directory
          let newFileName = path.join(uploadFolder, fileName);
          console.log(newFileName)
          fs.renameSync(file.filepath, newFileName);
  
          console.log(path.extname(fileName))
          if(bfound==false){
            const newAsset = await Asset({
                projectid: fields.projectid[0]
              , filename: fileName
              , filepath : newFileName
              , filetype : path.extname(fileName)
              //, data: data.data
            });
            await newAsset.save();
          }else{
            console.log("same file?");
          }
          //const saveObject = await newAsset.save();
          return res.json({message:'uploaded'})
          //console.log(file.filepath)
          //fs.unlinkSync( file.filepath )
        } catch (error) {
          console.log(error);
          return res.json({error:'try fail upload'})
        }
      }
      return res.json({error:'fail upload'})
    });
  }

  //res.status(200).json({ name: 'John Doe' })
}