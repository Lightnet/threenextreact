/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { isEmpty } from "../../lib/helper.mjs";
import { log } from "../../lib/log";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadFolder = path.join(__dirname, "../../public", "files");
log(uploadFolder)

export default async (req, res) => {
  const session = await getSession({ req })
  //log("session", session);
  let {error, userid, username} = await sessionTokenCheck(session);
  //log(error);
  //log(userid);
  //log(username);
  if(error){
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Asset = db.model('Asset');

  if(req.method == 'POST'){
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL"});
    }

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
        log(e);
        return res.json({error:"FAIL! Get Assets!"});
      }
    }else{
      return res.json({error:"Fail Assets"})
    }
  }

  if(req.method == 'DELETE'){
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL"});
    }
    if(api=="DELETE"){
      try{
        let data = req.body;
        let assets = await Asset.findOne({id:data.id})
          .select('id projectid filename filetype filepath')
          .exec();
        //log(assets)
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
        log(e);
        return res.json({error:"FAIL! Get Assets!"});
      }
    }else{
      return res.json({error:"Fail Assets"})
    }
  }

  //res.end();
  return res.json({error:"FAIL"});
}