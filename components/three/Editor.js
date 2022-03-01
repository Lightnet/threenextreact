/*
  LICENSE: MIT
  Created by: Lightnet

  over lap divs can't used mouse event

*/

import React, { useEffect, useState } from "react";

// Dev
import { isEmpty } from "../../lib/helper.mjs";
import useFetch from "../hook/useFetch.mjs";
import { useEditor } from "./context/EditorProvider.js";
import { useProject } from "./context/ProjectProvider.js";
import { useEntity } from "./context/EntityProvider.js";

import Viewport3D from "./ui/Viewport3D.js";
import EditorHeaderMain from "./ui/EditorHeaderMain.js";
import EditorSidebarMainRight from "./ui/EditorSidebarMainRight.js";
import EditorSidebarMainBottom from "./ui/EditorSidebarMainBottom.js";
import EditorSidebarMainLeft from "./ui/EditorSidebarMainLeft.js";

export default function Editor({projectid}){

  //const [enableOrbitControl, setEnableOrbitControl] = useState(true);

  const {
      settings
    , setSettings
    , selectObject
    , setSelectObject
    , enableOrbitControl
    , setEnableOrbitControl
  }= useEditor();

  const {
      sceneID
    , setSceneID
    , entities
    , dispatchEntity
  } = useEntity();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
      projectID
    , setProjectID
    , setProjectName
  } = useProject();

  //check for project id load from props
  useEffect(()=>{
    //console.log("projectid")
    //console.log(projectid)
    if(!isEmpty(projectid)){
      //console.log("found project ID:" + projectid)
      setProjectID(projectid);
    }else{
      //console.log("None project ID from props")
    }
  },[projectid])

  //check for project id from assign set<name>
  useEffect(()=>{
    //console.log("projectID")
    //console.log(projectID)
    if(!isEmpty(projectID)){
      //console.log("found project ID")
      getProjectData();
    }else{
      //console.log("None project ID")
    }
  },[projectID])

  //check sceneid to load entity objects
  useEffect(()=>{
    if(!isEmpty(sceneID)){
      getSceneEntities();
    }
  },[sceneID])

  //get project data from fetch
  async function getProjectData(){
    if(isEmpty(projectID)){
      console.log("Empty projectID!");
      return;
    }
    let data = await useFetch('api/project',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
        api:'PROJECT',
        projectid:projectID
      })
    });
    if(data.error){
      console.log("ERROR FETCH GET PROJECT");
      return;
    }
    //console.log(data);
    if(data.api=='PROJECT'){
      //console.log('API get Project!');
      setSceneID(data.sceneid);
      setProjectName(data.name);
    }
  }

  //get entity objects data from fetch
  async function getSceneEntities(){
    if(isEmpty(sceneID)){
      console.log("Empty sceneID!");
      return;
    }
    let data = await useFetch('api/entity',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
          api:'ENTITIES'
        , projectid:projectID
        , sceneid:sceneID
      })
    });
    if(data.error){
      console.log("ERROR FETCH GET ENTITIES");
      return;
    }
    //console.log(data);
    if(data.api=='ENTITIES'){
      //console.log('API get entities!');
      dispatchEntity({
          type:"array"
        , entities: data.entities
      })
    }
  }

  return(<>
    
    <Viewport3D/>

    <EditorSidebarMainLeft/>

    <EditorSidebarMainRight/>

    <EditorHeaderMain/>
    
    <EditorSidebarMainBottom/>
    
  </>)
}