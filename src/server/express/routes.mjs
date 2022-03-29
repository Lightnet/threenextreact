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
router.use((req,res,next)=>{

  next();
});

router.use(auth);
router.use("/api",route_three);
router.use(route_test);
router.use("/api",route_upload);
// added last for error or url does not exist
router.get('*', (req, res) => {
  //res.send(
    //'<script src="/bundle.js"></script>'
  //)

  // respond with html page
  if (req.accepts('html')) {
    //res.redirect(301, '/');
    //res.sendFile(path.join(__dirname, '../index.html'));
    res.sendFile(path.join(__dirname,"../../../index.html"))
    /*
    res.send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>REACT App</title>
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script src="/bundle.js"></script>
  </body>
</html>`);
*/
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