/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import db,{ sessionTokenCheck } from "../../lib/database";
import { log } from "../../lib/log";

export default async (req, res) => {
  
  const session = await getSession({ req })
  //console.log("session", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({message:"FAIL"});
  }

  const Object3D = db.model('Object3D');
  //check for scene id from database current set
  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){
    //let data = JSON.parse(req.body);
    let data = req.body;
    console.log(data)
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
        let doc = await Object3D.findOneAndDelete({id:data.id});
        console.log(doc);
        return res.json({action:"DELETE",id:data.id});
      }

      //END ACTION
    }
  }
  return res.json({error:"FAIL"});
}