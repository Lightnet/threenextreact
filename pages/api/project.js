/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { getSession } from "next-auth/react";
import clientDB,{ sessionTokenCheck } from "../../lib/database.mjs";
import {log} from "../../lib/log";
import { isEmpty, nanoid32 } from "../../lib/helper.mjs";
import API from "../../components/three/context/API.mjs";

export default async (req, res) => {

  const session = await getSession({ req });
  //log("session:", session);

  let {error, userid, username} = await sessionTokenCheck(session);
  //log(error);
  //log(userid);
  //log(username);
  if(error){
    return res.json({error:"FAIL"});
  }

  const db = await clientDB();
  const Project = db.model('Project');

  if(req.method == 'GET'){
    try{
      const projects = await Project.find({userid: userid}).exec();
      return res.json({api:'LIST',projects:projects});
    }catch(e){
      return res.json({ error: 'Fail to load Project List.' });
    }
  }

  if(req.method == 'POST'){
    //let data = req.body;
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL"});
    }

    if(api==API.PROJECT){
      let data = req.body;
      const Project = db.model('Project');
      try{
        let project = await Project.findOne({id: data.projectid}).exec();
        return res.json({
          api:API.PROJECT
          , project: project
          , sceneid: project.defaultsceneid
          , name: project.name
        });
      }catch(e){
        log(e);
        return res.json({error:"GET PROJECT FAIL"});
      }
    }
  
    if(api== API.CREATE){
      let data = req.body;
      try{
        let projectID = nanoid32();
        let sceneID = nanoid32();
  
        let newProject = new Project({
            id:projectID
          , userid: userid
          , username: username
          , name:data.name
          , description: data.description
          , defaultsceneid:sceneID
        });
  
        const Scene = db.model('Scene');
        let newScene = new Scene({
            projectid:projectID
          , objectid:sceneID
          , userid: userid
          , username: username
        })
  
        let saveProject = await newProject.save();
        //if (err) return handleError(err);
        // saved!
        //log("saveProject");
        //log(saveProject);
  
        await newScene.save();
        //let saveScene = await newScene.save();
        //log(saveScene);
        return res.json({api:'CREATE',project:saveProject});
      }catch(e){
        log(e);
        return res.json({error:"CREATE PROJECT FAIL"});
      }
    }
    
  }

  if(req.method == 'PUT'){
    const {api} = req.body;
    if(isEmpty(api)){
      return res.json({error:"FAIL"});
    }
    if(api==API.UPDATE){
      let data = req.body;
      const Project = db.model('Project');
      try{
        let query={
          id:data.id
        }
        let update={
            name:data.name
          , description:data.description
        }
        const updateProject = await Project.findOneAndUpdate(query,update,{new:true}).exec();
        return res.json({api:'UPDATE',project:updateProject});
      }catch(e){
        //log(e);
        return res.json({error:"UPDATE PROJECT FAIL"});
      }
    }
  }

  if(req.method == 'DELETE'){
    const {api} = req.body;
    if(isEmpty(api)){return res.json({error:"FAIL"});}
    if(api==API.DELETE){
      let data = req.body;
      const Project = db.model('Project');
      const Scene = db.model('Scene');
      try{
        const deleteProject = await Project.deleteOne({id:data.id}).exec();
        log(deleteProject);
        //need to delete scene, object3d
        const deleteScene = await Scene.deleteMany({projectid:data.id}).exec();
        log(deleteScene);
  
        return res.json({api:API.DELETE,projectid:data.id});
      }catch(e){
        log(e);
        return res.json({error:"DELTE PROJECT FAIL"});
      }
    }

  }

  return res.json({error:"FAIL"});
}