/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://nextjs.org/learn/basics/api-routes/creating-api-routes
// https://nextjs.org/learn/basics/api-routes/api-routes-details

//export default function handler(req, res) {
  //res.status(200).json({ text: 'Hello' })
//}

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
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

  //res.end();
  return res.json({error:"FAIL"});
}