/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import db,{ sessionTokenCheck } from "../../lib/database";
import { nanoid16 } from "../../lib/helper";
import { log } from "../../lib/log";

export default async (req, res) => {

  const session = await getSession({ req })
  //console.log("session:", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }
  const Scene = db.model('Scene');

  //check for scene id from database current set
  if(req.method == 'GET'){
    //get scenes but need editor id
  }

  if(req.method == 'POST'){
    let data = req.body;
    if(data.action){
      if(data.action=='SCENES'){
        let scenes = await Scene.find({editorid:data.id}).exec();
        console.log(scenes)
        return res.json({action:"SCENES",scenes:scenes});
      }
      if(data.action=='CREATE'){
        let newScene = new Scene({
          editorid:data.id,
          name:nanoid16()
        });

        let saveScene = await newScene.save();

        return res.json({action:'CREATE',scene:saveScene});
      }
    }
  }

  //edit update
  if(req.method == 'PATCH'){
    let data = req.body;
  }

  if(req.method == 'DELETE'){
    let data = req.body;
    if(!data.id){
      return res.json({error:"FAIL"});    
    }
    let deleteScene = await Scene.findOneAndDelete({id:data.id});
    console.log('deleteScene:' , deleteScene)

    return res.json({action:'DELETE',id:data.id});
  }

  return res.json({error:"FAIL"});
}