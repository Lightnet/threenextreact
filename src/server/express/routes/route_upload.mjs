/*
  LICENSE: MIT
  Created by: Lightnet
*/
/*
  //    id        //field name with space between
  find({ id:id }).select('id name date').exec(callback);
 */

// https://expressjs.com/en/guide/routing.html
// https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
// https://stackoverflow.com/questions/41878838/how-do-i-set-multipart-in-axios-with-react
// https://stackoverflow.com/questions/26691543/return-certain-fields-with-populate-from-mongoose
// https://www.codegrepper.com/code-examples/whatever/mongodb+select+fields+from+array
// https://stackoverflow.com/questions/15229966/in-mongoose-how-to-select-the-fields-in-a-array-property
// 
// 


import express from 'express';
import formidable from "formidable";
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import clientDB, { expressSessionTokenCheck } from '../../../../lib/database.mjs';
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadFolder = path.join(__dirname, "../../../../public", "files");

const router = express.Router();

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

router.post('/upload', async function (req, res) {

  const {error, userid, username} = await expressSessionTokenCheck(req.session);
  //console.log(error)
  //console.log(userid)
  //console.log(username)
  if(error){
    console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  //console.log(req.body)
  //console.log(req.body.projectid)
  // setup
  const form = formidable({
    multiples: false
    , maxFileSize:50 * 1024 * 1024 // 5MB
    , uploadDir : uploadFolder
  });
  //console.log(uploadFolder);
  // Basic Configuration
  //form.multiples = false;
  //form.maxFileSize = 50 * 1024 * 1024; // 5MB
  //form.uploadDir = uploadFolder;
  //console.log(form);
  //return res.json({error:'fail upload'})
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
  //return res.json({error:'fail upload'})
})

export default router;