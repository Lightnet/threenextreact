/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import db from "../../lib/database";
import { log } from "../../lib/log";

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
  const Object3D = db.model('Object3D');
  //check for scene id from database current set
  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){
    let data = JSON.parse(req.body);
    if(data.action){
      if(data.action == 'LIST'){
        const object3ds = await Object3D.find({sceneid: data.sceneid}).exec();
        console.log(object3ds);
        if(object3ds.length==0){
          return res.json({action:"NOOBJECT3DS"}); 
        }
        if(object3ds.length > 0){
          let objs=[];
          for(let i=0;i<object3ds.length;i++){
            objs.push(object3ds[i].data);
          }
          return res.json({action:"UPDATE",object3ds:objs});
        }
      }
      if(data.action == 'CREATE'){
        const newobject3d = await Object3D({
          sceneid: data.sceneid
          , id : data.data.id
          , data: data.data
        });
        const saveObject = await newobject3d.save();
        return res.json({action:"CREATE",object3d:saveObject});
      }

      if(data.action == 'UPDATE'){
        let query={
          id:data.data.id
        }
        let update={
          data:data.data
        }
        let doc = await Object3D.findOneAndUpdate(query,update,{new:true});
        return res.json({action:"UPDATE",object3d:doc});
      }

      if(data.action == 'DELETE'){
        let doc = await Object3D.findOneAndDelete({id:data.data.id});
        console.log(doc);
        return res.json({action:"DELETE",id:data.data.id});
      }

      //END ACTION
    }
  }
  return res.json({error:"FAIL"});
}