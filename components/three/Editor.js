/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { isEmpty } from "../../lib/helper.mjs";
import useFetch from "../hook/usefetch.js";
import { useEditor } from "./context/EditorProvider.js";
import { useProject } from "./context/ProjectProvider.js";
import { useThree } from "./context/ThreeProvider.js";
import EntityCreate from "./create/EntityCreate.js";
import EntityList from "./ui/EntityList.js";

export default function Editor({projectid}){

  const {
      settings
    , setSettings
    , selectObject
    , setSelectObject
  }= useEditor();

  const {
      sceneID
    , setSceneID
    , entities
    , dispatchEntity
  } = useThree()

  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
      projectID
    , setProjectID
    , projectName
    , setProjectName

  } = useProject();

  useEffect(()=>{
    //console.log("projectid")
    console.log(projectid)
    if(!isEmpty(projectid)){
      //console.log("found project ID")
      setProjectID(projectid);
    }else{
      console.log("None project ID from props")
    }
  },[projectid])

  useEffect(()=>{
    console.log("projectID")
    console.log(projectID)
    if(!isEmpty(projectID)){
      console.log("found project ID")
      getProjectData();
    }else{
      console.log("None project ID")
    }
  },[projectID])

  useEffect(()=>{
    if(!isEmpty(sceneID)){
      getSceneEntities();
    }
  },[sceneID])

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
    console.log(data);
    if(data.api=='PROJECT'){
      console.log('API get Project!');
      setSceneID(data.sceneid);
      setProjectName(data.name);
    }
  }

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
    console.log(data);
    if(data.api=='ENTITIES'){
      console.log('API get entities!');
      dispatchEntity({
          type:"array"
        , entities: data.entities
      })
    }
  }

  return(<>
    <label> Editor </label><br/>

    <EntityCreate/>
    <EntityList/>
  </>)
}