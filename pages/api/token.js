/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://next-auth.js.org/configuration/options
import { getToken } from "next-auth/jwt"
import db from "../../lib/database";

const secret = process.env.JWT_SECRET;

export default async (req, res) => {
  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)

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
  
  res.end()
}