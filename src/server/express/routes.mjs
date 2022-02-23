/*
  LICENSE: MIT
  Created by: Lightnet
*/

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
const router = express.Router();
import route_test from './routes/route_test.mjs';
import route_three from './routes/route_three.mjs';
import route_upload from './routes/route_upload.mjs';

//import route_download from './routes/route_download.js';

import auth from './routes/auth.mjs';
//router.use(route_download);

router.use(auth);
router.use("/api",route_three);
router.use(route_test);
router.use(route_upload);
// added last for error or url does not exist
router.get('*', (req, res) => {
  //res.send(
    //'<script src="/bundle.js"></script>'
  //)

  // respond with html page
  if (req.accepts('html')) {
    //res.redirect(301, '/');
    //res.sendFile(path.join(__dirname, '../index.html'));
    res.send('<script src="/bundle.js"></script>');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.status(404);
    res.json({ error: 'Not found' });
    return;
  }

  res.status(404);
  // default to plain-text. send()
  res.type('txt').send('Not found');
})

export default router;