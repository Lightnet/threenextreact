/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://bobbyhadz.com/blog/javascript-check-if-object-is-empty

import express from 'express';
import clientDB from '../../../../lib/database.mjs';
//import bodyParser from 'body-parser';

const isObjEmpty = (obj) => Object.keys(obj).length === 0;

const router = express.Router();
//router.use(bodyParser.json());
router.use(express.json());

router.post('/signin', async function (req, res) {
  var contentType = req.headers['content-type'];
  //console.log(contentType);
  //console.log(req.body); // your JSON
  let data = req.body;
  if(isObjEmpty(data)){
    return res.json({error:"body empty?" });
  }
  //console.log(isObjEmpty(data))
  
  const db = await clientDB();
  const User = db.model('User');
  //console.log("USER...?")
  const user = await User.findOne({ username: data.userName }).exec();

  //console.log("users");
  //console.log(user);
  if(!user){
    return res.send({action:'NONEXIST'});
  }else{
    if(user.validPassword(data.password)){
      //user.toAuthJSON();
      //console.log("[login] password pass!");
      let AuthUser=null;
      try{
        AuthUser = user.toAuthJSON()
        //console.log("AuthUser:", AuthUser)
        req.session.user = AuthUser.name;
        req.session.token = AuthUser.token;
      }catch(e){
        //console.log(e);
        return res.send({error:'LOGIN toAuthJSON ERROR'});
      }
      //console.log(req.session);
      return res.send({action:'LOGIN',user:AuthUser.name,token:AuthUser.token});
    }else{
      //console.log("[login] password fail!");
      return res.send({error:"PASSWORDFAIL"});
    }
    //return res.send({action:'EXIST'});
  }

  //return res.send(req.body); // echo the result back
  //res.send(`<html lang="en">page</html>`);
});

router.post('/signup',async function (req, res) {
  //console.log(req.body); // your JSON
  let data = req.body;
  let db = await clientDB();
  let User = db.model('User');
  let users = await User.findOne({ username: data.user }).exec();
  //console.log("users");
  //console.log(users);
  if(!users){
    let newUser = new User({
      username: data.user
    });
    newUser.setPassword(data.password);
    let saveUser = await newUser.save();
    //return res.send(saveUser);
    return res.send({action:'CREATE'});
  }else{
    return res.send({action:'EXIST'});
  }

  //return res.send(req.body); // echo the result back
  //res.send(`<html lang="en">page</html>`);
});

router.post('/signout',async function (req, res) {
  //console.log(req.session)
  //req.session.user = null;
  //req.session.token = null;
  req.session.destroy(function(err) {
    console.log(err);
    console.log(req.session);
    // cannot access session here
  })
  //console.log(req.body); // your JSON
  //let data = req.body;
  let db = await clientDB();
  let User = db.model('User');
  // neeed token
  // 

  //let user = await User.findOne({ username: data.user }).exec();
  //if(!user){
    //return res.send({action:'NONEXIST'});
  //}else{
    //return res.send({action:'EXIST'});
  //}
  return res.json({action:'SIGNOUT'}); // echo the result back
  //return res.send({error:'ERROR'}); // echo the result back
  //res.send(`<html lang="en">page</html>`);
});

router.get('/session',async function (req, res) {
  //console.log(req.session);
  //return res.json(req.session);
  return res.json({
    user:req.session.user,
    token:req.session.token
  });
})

router.get('/cookie', function (req, res) {
  console.log('cookie ...')
  res.json({cookie:'nocookie'})
})

export default router;