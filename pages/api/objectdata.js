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
    return res.json({error:"FAIL"});
  }
  const ObjectData = db.model('ObjectData');

  //check for scene id from database current set
  if(req.method == 'GET'){
    try{
      let objectDatas = await ObjectData.find().exec();
      //console.log(scenes)
      return res.json({action:"OBJECTDATAS",objectdatas:objectDatas});
    }catch(e){
      return res.json({error:"FAILSCENES"});
    }
  }


  return res.json({error:"FAIL"});
}