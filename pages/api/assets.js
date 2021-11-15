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

  //res.end();
  return res.json({error:"FAIL"});
}