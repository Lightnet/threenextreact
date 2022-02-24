/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import API from '../../../../../components/three/context/API.mjs';
import clientDB, { expressSessionTokenCheck } from '../../../../../lib/database.mjs';
import { isEmpty } from '../../../../../lib/helper.mjs';
const router = express.Router();

router.get('/scene', async (req, res) => {
  //res.json({ error: 'Not found' });
  res.json({ error: 'not found!' });
})

router.post('/scene', async (req, res) => {

  const {api} = req.body;
  if(isEmpty(api)){
    return res.json({error:"FAIL Scene Post"});
  }

  const {error, userid, username} = await expressSessionTokenCheck(req.session);

  if(error){
    console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  const Scene = db.model('Scene');

  if(api==API.CREATE){
    let data = req.body;

    try{

      const Scene = db.model('Scene');
      let newScene = new Scene({
          projectid:data.projectid
        , userid: userid
        , username: username
        , name: data.name
        , description: data.description
      })

      let saveScene = await newScene.save();
      console.log(saveScene);

      return res.json({api:'CREATE',scene:saveScene});

    }catch(e){
      console.log(e);
      return res.json({error:"CREATE SCENE FAIL"});
    }
  }

  if(api==API.SCENES){
    let data = req.body;
    try{
      let scenes = await Scene.find({projectid: data.projectid})
        .select('projectid id objectid  name description')
        .exec();
        console.log(scenes);
      return res.json({
        api:API.SCENES
        , scenes:scenes
      });
    }catch(e){
      console.log(e);
      return res.json({error:"GET Scenes FAIL"});
    }
  }

  res.json({ error: 'not found scene!' });
})

router.put('/scene', async (req, res) => {

  const {api} = req.body;
  if(isEmpty(api)){
    return res.json({error:"FAIL Scene Post"});
  }
  const {error, userid, username} = await expressSessionTokenCheck(req.session);
  if(error){
    console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  
  const Scene = db.model('Scene');

  if(api==API.DEFAULT){
    let data = req.body;
    const Project = db.model('Project');
    try{
      let query={
        projectid:data.projectid
      }
      let update={
        defaultsceneid:data.id
        //, description:data.description || ""
      }

      const updateProject = await Project.findOneAndUpdate(query,update,{new:true})
        .select('projectid id objectid  name description')
        .exec();
      console.log(updateProject);

      return res.json({
        api:API.UPDATE
        , project:updateProject
      });
    }catch(e){
      console.log(e);
      return res.json({error:"UPDATE Project FAIL"});
    }
  }

  if(api==API.UPDATE){
    let data = req.body;
    try{
      let query={
        objectid:data.id
      }
      let update={
          name:data.name
        //, description:data.description || ""
      }
      if(data.description){
        update.description = data.description
      }

      const updateScene = await Scene.findOneAndUpdate(query,update,{new:true})
        .select('projectid id objectid  name description')
        .exec();
      console.log(updateScene);

      return res.json({
        api:API.UPDATE
        , scene:updateScene
      });
    }catch(e){
      console.log(e);
      return res.json({error:"UPDATE Scenes FAIL"});
    }
  }

  res.json({ error: 'not found!' });
})

router.delete('/scene', async (req, res) => {

  const {api} = req.body;
  if(isEmpty(api)){
    return res.json({error:"FAIL Scene Post"});
  }

  const {error, userid, username} = await expressSessionTokenCheck(req.session);

  if(error){
    console.log("Error! session check...");
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  const Scene = db.model('Scene');

  if(api== API.DELETE){
    let data = req.body;
    try{
      let deleteScene = await Scene.deleteOne({objectid: data.id}).exec();
        console.log(deleteScene);
      return res.json({
        api:API.DELETE
        , id:data.id
      });
    }catch(e){
      console.log(e);
      return res.json({error:"GET Scenes FAIL"});
    }
  }
  res.json({ error: 'not found!' });
})

export default router;