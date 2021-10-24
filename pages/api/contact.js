/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res)=>{
  if(req.method !== 'POST'){
    return res.status(405).json({message:'Method not allowed!'});
  }
  //need to check format error later...
  //reason is header check for format.
  console.log(req.body);
  //console.log(req.body.firstname);
  var contactData = JSON.parse(req.body);
  console.log(contactData);
  console.log(contactData.firstname);
  
  //const contactData = req.body;
  const saveContact = await prisma.contact.create({
    data:contactData
  })
  res.json(saveContact);
  

  //res.json({message:'hello world!'});
};

/*

async function saveContact(cantact){
  const response = await fetch('/api/contacts',{
    method:'POST',
    body:JSON.stringify(contact)
  });
  if(!response.ok){
    throw new Error(response.statusText);
  }
  return await response.json();
}


*/