/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database.mjs";
import {log} from "../../lib/log";
import { nanoid32 } from "../../lib/helper.mjs";

export default async (req, res) => {

  const session = await getSession({ req });
  //log("session:", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //log(error);
  //log(userid);
  //log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  const Editor = db.model('Editor');

  if(req.method == 'GET'){
    const editors = await Editor.find({userid: userid}).exec();
    //log(editors);
    //log("API PROJECT LIST")
    return res.json({action:'LIST',editors:editors});
  }

  if(req.method == 'POST'){
    let data = req.body;
    //log(data);
    if(data){
      if(data.action){
        if(data.action == 'CREATE'){
          try{
            let editorID = nanoid32();
            let sceneID = nanoid32();

            let newEditor = new Editor({
              id:editorID
              , userid: userid
              , username: username
              , name:data.name
              , description: data.description
              , defaultsceneid:sceneID
            });

            const Scene = db.model('Scene');

            let newScene = new Scene({
              editorid:editorID
              , name: nanoid32()
              , id:sceneID
              , userid: userid
              , username: username
            })
          
            let saveEditor = await newEditor.save();
            //if (err) return handleError(err);
            // saved!
            //log("save user");
            //log(saveEditor);

            let saveScene = await newScene.save();
            //log(saveScene);

            return res.json({action:'CREATE',editor:saveEditor});
          }catch(e){
            return res.json({error:"FAILCREATE"});
          }
        }

        if(data.action == 'INFO'){
          try{
            const editor = await Editor.findOne({id: data.editorid}).exec();
            //log(editor);
            return res.json({
              action:"UPDATE",
              sceneid:editor.defaultsceneid,
              editorname:editor.name
            });
          }catch(e){
            return res.json({error:"FAILDEFAULTSCENE"});
          }
        }
        //END ACTION
      }
    }
  }

  if(req.method == 'PATCH'){
    let data = req.body;
    let query={
      id:data.editorid
    }
    let update={
      name:data.name
      , description:data.description
    }
    try{
      const updateeditor = await Editor.findOneAndUpdate(query,update,{new:true}).exec();
      return res.json({action:"UPDATE",editor:updateeditor});
    }catch(e){
      return res.json({error:"FAILDELETE"});
    }
  }

  if(req.method == 'DELETE'){
    //need to work on delete relate project data tables
    let data = req.body;
    try{
      const deleteEditor = await Editor.deleteOne({id:data.editorid}).exec();
      log(deleteEditor);

      return res.json({action:"DELETE",id:data.editorid});
    }catch(e){
      return res.json({error:"FAILDELETE"});
    }
  }

  return res.json({error:"FAIL"});
}