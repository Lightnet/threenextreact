//import {NextApiRquest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getCsrfToken, getProviders   } from "next-auth/react";
import prisma from '../client';
//const prisma = new PrismaClient();

export default async (req, res)=>{
  console.log("[[[   SIGN IN?");

  //const csrfToken = await getCsrfToken({ req });
  const csrfToken = await getCsrfToken();
  console.log("csrfToken:",csrfToken);

  const providers = await getProviders();
  console.log("Providers", providers)

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
  console.log("users==]]]]]]]]]]]]]]]]]]]]]]]]]]]");
  console.log(users);
  // https://next-auth.js.org/providers/credentials
  if((users.length==0) &&(contactData.newUser=="true")){ //not found
    const saveUser = await prisma.user.create({
      data:{
        alias:contactData.alias,
        passphrase:contactData.passphrase
      }
    })
    return res.json(saveUser);
  }
  if(users.length==1){
    return res.json({
      id:users[0].id,
      alias:users[0].alias,
      token:"teste"
    });  
  }

  //res.json({id: 1, name: 'J Smith', email: 'jsmith@example.com'});
  console.log("Unknown Login...")
  return res.json({error:"NOTFOUND"});
};