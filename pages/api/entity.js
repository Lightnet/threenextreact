/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { isEmpty } from "../../lib/helper.mjs";
import { log } from "../../lib/log";

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
  const Entity = db.model('Entity');

  if(req.method == 'POST'){
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL"});
    }
    if(api=="ENTITIES"){
      try{
        let data = req.body;
        let entities = await Entity.find({sceneid: data.sceneid}).exec();
        //log("entities///////////////");
        //log(entities);
        let _entities = [];
        for(let idx in entities){
          //log(entities[idx]);
          _entities.push(entities[idx].data)
        }
        return res.json({
          api:'ENTITIES'
          , entities:_entities
        });
      }catch(e){
        log(e);
        return res.json({error:"GET PROJECT FAIL"});
      }
    }
    if(api=="CREATE"){
      try{
        let data = req.body;
        const newEntity = await Entity({
            projectid: data.projectid
          , sceneid: data.sceneid
          , objectid : data.data.objectid
          , data: data.data
        });
        const saveObject = await newEntity.save();
        return res.json({api:"CREATE",Entity:saveObject});
      }catch(e){
        return res.json({error:"Fail Create Entity!"});
      }
    }
  }

  if(req.method == 'PUT'){
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL"});
    }
    if(api=="UPDATE"){
      try{
        let data = req.body;
        let query={
          objectid:data.data.objectid
        }
        //log(query)
        let update={
          data:data.data
        }
        //log(update)
        try{
          let doc = await Entity.findOneAndUpdate(query,update,{new:true});
          return res.json({api:"UPDATE",entity:doc});
        }catch(e){
          return res.json({error:"FAILUPDATE"});
        }
      }catch(e){
        log(e);
        return res.json({error:"Delete Entity Fail!"});
      }
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
        const Entity = db.model('Entity');
        await Entity.findOneAndDelete({objectid:data.objectid});
        //let doc = await Entity.findOneAndDelete({id:data.id});
        //log("DOC//////////////////////");
        //log(doc);
        return res.json({
          api:'DELETE'
          , id:data.id
        });
      }catch(e){
        log(e);
        return res.json({error:"Delete Entity Fail!"});
      }
    }
  }

  return res.json({error:"FAIL"});
}