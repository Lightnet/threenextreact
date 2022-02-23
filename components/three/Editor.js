/*
  LICENSE: MIT
  Created by: Lightnet

  over lap divs can't used mouse event 

*/

import React, { useEffect, useState } from "react";

// Dev
import { isEmpty } from "../../lib/helper.mjs";
import useFetch from "../hook/usefetch.js";
import { useEditor } from "./context/EditorProvider.js";
import { useProject } from "./context/ProjectProvider.js";
import { useEntity } from "./context/EntityProvider.js";
import EntityCreate from "./create/EntityCreate.js";
import EntityList from "./ui/EntityList.js";

// THREE
import { Canvas } from '@react-three/fiber';
import { GizmoHelper, GizmoViewport } from '@react-three/drei';
// Physics
import { Physics } from '@react-three/cannon';
import EntityRenderModel from "./EntityRenderModel.js";
import EntityOrbitControl from "./entity/EntityOrbitControl.js";
import EntitySelectUpdate from "./property/EntitySelectUpdate.js";

export default function Editor({projectid}){

  const [enableOrbitControl, setEnableOrbitControl] = useState(true);

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
  } = useEntity();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const {
      projectID
    , setProjectID
    , projectName
    , setProjectName
  } = useProject();

  //check for project id load from props
  useEffect(()=>{
    //console.log("projectid")
    //console.log(projectid)
    if(!isEmpty(projectid)){
      //console.log("found project ID")
      setProjectID(projectid);
    }else{
      console.log("None project ID from props")
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
    console.log(data);
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
    
    <div style={{ //threejs canvas
      position:'absolute'
      ,top:'0px'
      //,left:'0px'
      ,left:'300px'
      //,width:'100%'
      ,width:'calc(100% - 600px)'
      ,height:'calc(100% - 56px)'
    }}>
    
    <Canvas>
      <Physics>
        {entities.map((entity)=>{
          //if(entity.isPhysics == true){
            return EntityRenderModel(entity); //return buildModel(entity)
          //}
        })}
      </Physics>
      {
      enableOrbitControl && <EntityOrbitControl />
      }
      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
        >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      {/*
      */}
    </Canvas>
    </div>

    <div style={{//left bar
      position:'absolute'
      ,top:'28px'
      ,left:'0px'
      ,width:'300px'
      ,height:'calc(100% - 56px)'
      ,background:'#778899'
    }}>
      {/* over lap can used mouse event */}
      <label> Editor </label><br/>
      <EntityCreate/>
      <EntityList/>

    </div>

    <div style={{//right bar
      position:'absolute'
      ,top:'28px'
      ,right:'0px'
      ,width:'300px'
      ,height:'calc(100% - 56px)'
      ,background:'#778899'
    }}>
      {/* over lap can used mouse event */}
      <label> Editor </label><br/>
      <EntitySelectUpdate/>
    </div>


    <div style={{ //top
      position:'absolute'
      ,top:'0px'
      //,left:'0px'
      ,left:'0px'
      //,width:'100%'
      ,width:'100%'
      ,height:'28px'
      ,background:'gray'
    }}>
      <button> Test </button>

    </div>


    <div style={{ //top
      position:'absolute'
      ,bottom:'0px'
      //,left:'0px'
      ,left:'0px'
      //,width:'100%'
      ,width:'100%'
      ,height:'28px'
      ,background:'gray'
    }}>


    </div>

    
  </>)
}