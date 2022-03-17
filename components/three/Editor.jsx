/*
  LICENSE: MIT
  Created by: Lightnet

  over lap divs can't used mouse event

*/

import React, { useEffect, useState } from "react";

// Dev
import { isEmpty } from "../../lib/helper.mjs";
import useFetch from "../hook/useFetch.mjs";
//import { useEditor } from "./context/EditorProvider.jsx";
import { useProject } from "./context/ProjectProvider.jsx";
import { useEntity } from "./context/EntityProvider.jsx";

import EditorViewport3D from "./ui/EditorViewport3D.jsx";
import EditorHeaderMain from "./ui/EditorHeaderMain.jsx";
import EditorSidebarMainRight from "./ui/EditorSidebarMainRight.jsx";
import EditorSidebarMainBottom from "./ui/EditorSidebarMainBottom.jsx";
import EditorSidebarMainLeft from "./ui/EditorSidebarMainLeft.jsx";

export default function Editor({projectid}){

  /*
  const {
      settings
    , setSettings
    , selectObject
    , setSelectObject
    , enableOrbitControl
    , setEnableOrbitControl
  }= useEditor();
  */

  const {
      sceneID
    , setSceneID
    , entities
    , dispatchEntity
  } = useEntity();

  const {
      projectID
    , setProjectID
    , setProjectName
  } = useProject();

  //check for project id load from props
  useEffect(()=>{
    //console.log("projectid: ", projectid)
    if(!isEmpty(projectid)){
      //console.log("found project ID:" + projectid)
      setProjectID(projectid);
    }else{
      //console.log("None project ID from props")
    }
  },[projectid])

  //check for project id from assign set<name>
  useEffect(()=>{
    //console.log("projectID: ", projectID)
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
    
    <EditorViewport3D/>

    <EditorSidebarMainLeft/>

    <EditorSidebarMainRight/>

    <EditorHeaderMain/>
    
    <EditorSidebarMainBottom/>
    
  </>)
}