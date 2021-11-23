/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { log } from "../../lib/log";

export default async (req, res) => {
  const session = await getSession({ req })
  //console.log("session", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //console.log(error);
  //console.log(userid);
  //console.log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();

  if(req.method == 'POST'){

  }

  if(req.method == 'DELETE'){
    let data = req.body;
    if(!data.id){
      return res.json({error:"FAIL"});    
    }
    try{
      let deleteScene = await Scene.findOneAndDelete({id:data.id});
      console.log('deleteScene:' , deleteScene)

      return res.json({action:'DELETE',id:data.id});
    }catch(e){
      return res.json({error:"FAILDELETE"});
    }
  }

  //res.end();
  return res.json({error:"FAIL"});
}