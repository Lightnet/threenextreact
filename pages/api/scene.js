/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import db,{ sessionTokenCheck } from "../../lib/database";
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

  //check for scene id from database current set
  if(req.method == 'GET'){

  }

  if(req.method == 'POST'){
    let data = JSON.parse(req.body);
  }

  return res.json({error:"FAIL"});
}