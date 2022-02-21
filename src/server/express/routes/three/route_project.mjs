/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();

import { nanoid32 } from "../../../../../lib/helper.mjs"
import clientDB from "../../../../../lib/database.mjs"

router.get('/project', async(req, res) => {
  //res.json({ error: 'Not found' });

  console.log(req.session);

  const db = await clientDB();







  res.json({ message: 'three index' });
})

export default router;