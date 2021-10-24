/*
  LICENSE: MIT
  Created by: Lightnet
*/

///import {prisma} from '../db';
import { PrismaClient } from '@prisma/client';
import {clientDB} from '../db';

export default async function handler(req, res) {
  let prisma = clientDB(PrismaClient);
  let users = await prisma.user.findMany();
  console.log(users);
  res.status(200).json({ text: 'Hello' })
}