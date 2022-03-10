/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getProviders } from "next-auth/react";
import clientDB from "../../lib/database";
import { log } from "../../lib/log";

export default async (req, res)=>{
  log("[[[=== SIGN IN ===]]]");
  //const prisma = clientDB(PrismaClient);

  //const csrfToken = await getCsrfToken({ req });
  const csrfToken = await getCsrfToken();
  log("csrfToken:",csrfToken);
  //const providers = await getProviders();
  //log("Providers", providers)

  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }
  const db = await clientDB();
  const User = db.model('User');
  
  log("req.body");
  log(req.body);
  //log(req.body.firstname);
  var userData = JSON.parse(req.body);

  //const user = await User.findOne({username: userData.alias}).then(function(user){
    const user = await User.findOne({username: userData.alias}).exec();
    log("user");
    log(user);
    if(userData.isNewUser){
      if(!user){
        log("[newUser] NOT FOUND, creating...")
        //create user
        let newUser = new User({username: userData.alias})
        newUser.setPassword(userData.passphrase);
        try{
        let saveUser = await newUser.save();
          //if (err) return handleError(err);
          // saved!
          log("save user");
          return res.json(saveUser.toAuthJSON());
        }catch(e){
          return res.json({error:"FAIL"});
        }
      }else{
        log("[newUser] Exist");
        return res.json({error:"EXIST"});
      }
    }else{
      if(!user){
        log("[login] NOT FOUND")
        return res.json({error:"NOTFOUND"});
        //create user
      }else{
        log("[login] Exist");
        if(user.validPassword(userData.passphrase)){
          //user.toAuthJSON();
          log("[login] password pass!");
          return res.json(user.toAuthJSON());
        }else{
          log("[login] password fail!");
          return res.json({error:"PASSWORDFAIL"});
        }
      }
    }
  //});

  //res.json({id: 1, name: 'J Smith', email: 'jsmith@example.com'});
  log("[[[=== UNKNOWN LOGIN FAIL ===]]]")
  return res.json({error:"NOTFOUND"});
};