/*
  LICENSE: MIT
  Created by: Lightnet
*/

//https://expressjs.com/en/guide/routing.html

import express from 'express';
const router = express.Router();

//Middle ware that is specific to this router
//router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  //next();
//});

// define the name page route
router.get('/test', function (req, res) {
  res.send('test page')
})

router.get('/json', function (req, res) {
  //throw new Error('BROKEN'); //test fetch error
  res.json({message:'test page'})
})

router.get('/jsone', function (req, res) {
  throw new Error('BROKEN'); //test fetch error
  res.json({message:'test page'})
})

router.get('/exit', function (req, res) {
  console.log('browser close...')
  res.send('test page')
})

export default router;