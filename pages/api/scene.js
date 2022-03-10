/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import API from "../../components/three/context/API.mjs";
import clientDB,{ sessionTokenCheck } from "../../lib/database";
import { isEmpty } from "../../lib/helper.mjs";
import { log } from "../../lib/log";

export default async (req, res) => {

  const session = await getSession({ req })
  //log("session:", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //log(error);
  //log(userid);
  //log(username);
  if(error){
    return res.json({error:"FAIL"});
  }
  const db = await clientDB();
  const Scene = db.model('Scene');

  //check for scene id from database current set
  if(req.method == 'GET'){
    //get scenes but need editor id
    res.json({ error: 'not found!' });
  }

  if(req.method == 'POST'){
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL Scene Post"});
    }
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
        await newScene.save();
        //let saveScene = await newScene.save();
        //log(saveScene);
        return res.json({api:'CREATE',scene:saveScene});
      }catch(e){
        log(e);
        return res.json({error:"CREATE SCENE FAIL"});
      }
    }
  
    if(api==API.SCENES){
      let data = req.body;
      try{
        let scenes = await Scene.find({projectid: data.projectid})
          .select('projectid id objectid  name description')
          .exec();
          //log(scenes);
        return res.json({
          api:API.SCENES
          , scenes:scenes
        });
      }catch(e){
        log(e);
        return res.json({error:"GET Scenes FAIL"});
      }
    }
  }

  //edit update
  if(req.method == 'PUT'){
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL Scene Post"});
    }
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
        //log(updateProject);
  
        return res.json({
          api:API.UPDATE
          , project:updateProject
        });
      }catch(e){
        log(e);
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
        //log(updateScene);
  
        return res.json({
          api:API.UPDATE
          , scene:updateScene
        });
      }catch(e){
        log(e);
        return res.json({error:"UPDATE Scenes FAIL"});
      }
    }
  }

  if(req.method == 'DELETE'){
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL Scene Post"});
    }
    if(api== API.DELETE){
      let data = req.body;
      try{
        let deleteScene = await Scene.deleteOne({objectid: data.id}).exec();
        //log(deleteScene);
        return res.json({
          api:API.DELETE
          , id:data.id
        });
      }catch(e){
        log(e);
        return res.json({error:"GET Scenes FAIL"});
      }
    }
  }

  return res.json({error:"FAIL"});
}