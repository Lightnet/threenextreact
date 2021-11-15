/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import db from "../../lib/database";
import {log} from "../../lib/log";
import { nanoid32 } from "../../lib/helper";

export default async (req, res) => {

  const session = await getSession({ req });
  //console.log("session");
  //console.log(session);

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
            userid = user.id;
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

  if(req.method == 'GET'){
    const Editor = db.model('Editor');
    if(data.action == 'LIST'){
      const editors = await Editor.find({userid: userid}).exec();
      console.log(editors);
      return res.json({action:'LIST',editors:editors});
    }
  }

  if(req.method == 'POST'){
    let data = JSON.parse(req.body);
    console.log(data);
    if(data){
      if(data.action){
        const Editor = db.model('Editor');
        if(data.action == 'LIST'){
          const editors = await Editor.find({userid: userid}).exec();
          console.log(editors);
          return res.json({action:'LIST',editors:editors});
        }

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