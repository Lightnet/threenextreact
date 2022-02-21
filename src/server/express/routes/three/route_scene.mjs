/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
const router = express.Router();

router.get('/scene', (req, res) => {
  //res.json({ error: 'Not found' });
  res.json({ message: 'three index' });
})

export default router;