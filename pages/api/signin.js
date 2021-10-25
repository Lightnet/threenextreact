/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getCsrfToken, getProviders } from "next-auth/react";
import { PrismaClient } from '@prisma/client';
import {clientDB} from '../db';

export default async (req, res)=>{
  console.log("[[[=== SIGN IN ===]]]");
  const prisma = clientDB(PrismaClient);

  //const csrfToken = await getCsrfToken({ req });
  const csrfToken = await getCsrfToken();
  console.log("csrfToken:",csrfToken);
  //const providers = await getProviders();
  //console.log("Providers", providers)

  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }
  
  console.log("req.body");
  console.log(req.body);
  //console.log(req.body.firstname);
  var userData = JSON.parse(req.body);
  //const allUsers  = await prisma.user.findMany({
  const users = await prisma.user.findMany({
    where:{
      alias:{
        equals:userData.alias
      }
    }
  });
  console.log("[[[=== LOGIN RESULT USER ==]]]");
  console.log(users);
  // https://next-auth.js.org/providers/credentials
  if((users.length==0) && (userData.newUser=="true")){ //not found
    console.log("[[[=== LOGIN REGISTER USER ==]]]");
    const saveUser = await prisma.user.create({
      data:{
        alias:userData.alias,
        passphrase:userData.passphrase
      }
    })
    return res.json({
      id:saveUser.id
      , name:saveUser.alias
      , role:"member"
    });
    //return res.json(saveUser);
  }
  if(users.length==1){
    console.log("[[[=== LOGIN GRANT USER ==]]]");
    return res.json({
      id:users[0].id,
      name:users[0].alias,
      role:"member"
    });  
  }

  //res.json({id: 1, name: 'J Smith', email: 'jsmith@example.com'});
  console.log("[[[=== UNKNOWN LOGIN FAIL ===]]]")
  return res.json({error:"NOTFOUND"});
};