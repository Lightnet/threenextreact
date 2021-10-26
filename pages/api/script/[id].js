/*
  LICENSE: MIT
  Created by: Lightnet

  Note: This load from local file js script.

*/



import { PrismaClient } from '@prisma/client';
import {clientDB} from '../db';

export default async function handler(req, res) {
  let prisma = clientDB(PrismaClient);
  let users = await prisma.user.findMany();
  console.log(users);
  res.status(200).json({ text: 'script id' })
}