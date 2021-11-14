/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import db from "../../lib/database";
import {log} from "../../lib/log";

export default async (req, res) => {
  const session = await getSession({ req })
  console.log("session");
  console.log(session);

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
          let newEditor = new Editor({
            userid: userid
            , username: username
            , name:data.name
            , description: data.description
          });

          try{
            let saveEditor = await newEditor.save();
            //if (err) return handleError(err);
            // saved!
            console.log("save user");
            console.log(saveEditor);
            return res.json({action:'CREATE',editor:saveEditor});
          }catch(e){
            return res.json({error:"FAIL"});
          }
        }
        //END ACTION
      }
    }
  }

  return res.json({error:"FAIL"});
}