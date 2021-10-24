/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { PrismaClient } from '@prisma/client';
import { getCsrfToken, getProviders   } from "next-auth/react";
import prisma from '../client';
//const prisma = new PrismaClient();

export default async (req, res)=>{
  console.log("[[[=== SIGN IN ===]]]");

  //const csrfToken = await getCsrfToken({ req });
  const csrfToken = await getCsrfToken();
  //console.log("csrfToken:",csrfToken);

  const providers = await getProviders();
  //console.log("Providers", providers)

  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }
  
  console.log("req.body");
  console.log(req.body);
  //console.log(req.body.firstname);
  var contactData = JSON.parse(req.body);
  //console.log(contactData);
  //console.log(contactData.firstname);
  /*
  //const contactData = req.body;
  const saveContact = await prisma.contact.create({
    data:contactData
  })
  res.json(saveContact);
  */

  //const allUsers  = await prisma.user.findMany({
  const users = await prisma.user.findMany({
    where:{
      alias:{
        equals:contactData.alias
      }
    }
  });
  console.log("[[[=== LOGIN RESULT USER ==]]]");
  console.log(users);
  // https://next-auth.js.org/providers/credentials
  if((users.length==0) && (contactData.newUser=="true")){ //not found
    console.log("[[[=== LOGIN REGISTER USER ==]]]");
    const saveUser = await prisma.user.create({
      data:{
        alias:contactData.alias,
        passphrase:contactData.passphrase
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