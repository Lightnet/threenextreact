/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import db,{ sessionTokenCheck } from "../../lib/database";
import {log} from "../../lib/log";
import { nanoid32 } from "../../lib/helper";

export default async (req, res) => {

  const session = await getSession({ req });
  //console.log("session:", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }
  const Editor = db.model('Editor');

  if(req.method == 'GET'){
    const editors = await Editor.find({userid: userid}).exec();
    //console.log(editors);
    console.log("API PROJECT LIST")
    return res.json({action:'LIST',editors:editors});
  }

  if(req.method == 'POST'){
    let data = req.body;
    console.log(data);
    if(data){
      if(data.action){
        if(data.action == 'CREATE'){
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


          try{
            let saveEditor = await newEditor.save();
            //if (err) return handleError(err);
            // saved!
            console.log("save user");
            console.log(saveEditor);

            let saveScene = await newScene.save();
            console.log(saveScene);

            return res.json({action:'CREATE',editor:saveEditor});
          }catch(e){
            return res.json({error:"FAIL"});
          }
        }

        if(data.action == 'UPDATE'){
          let query={
            id:data.editorid
          }
          let update={
            name:data.name
            , description:data.description
          }
          const updateeditor = await Editor.findOneAndUpdate(query,update,{new:true}).exec();
          return res.json({action:"UPDATE",editor:updateeditor});
        }

        if(data.action == 'DELETE'){
          const deleteEditor = await Editor.deleteOne({id:data.editorid}).exec();
          console.log(deleteEditor);

          return res.json({action:"DELETE",id:data.editorid});
        }

        if(data.action == 'DEFAULTSCENE'){
          const editor = await Editor.findOne({id: data.editorid}).exec();
          console.log(editor);
          return res.json({action:"UPDATE",sceneid:editor.defaultsceneid});
        }
        //END ACTION
      }


    }
  }

  return res.json({error:"FAIL"});
}