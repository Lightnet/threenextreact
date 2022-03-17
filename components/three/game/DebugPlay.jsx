/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { Physics } from "@react-three/cannon";
import { GizmoHelper, GizmoViewport, useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helper.mjs";
import useFetch from "../../hook/useFetch.mjs";
import { EditorContext } from "../context/EditorProvider.jsx";
import { useEntity } from "../context/EntityProvider";
import EntityOrbitControl from "../entity/EntityOrbitControl";
import EntityObjectTypes from "../helpers/EntityObjectTypes";
import EntityPhysicsTypes from "../helpers/EntityPhysicsTypes";

export default function DebugPlay({gameid}){

  const [gameID, setGameID] = useState("");
  const [gameName, setGameName] = useState("");
  const [enablePhysics, setEnablePhysics] = useState(true);
  const [enableOrbitControl, setEnableOrbitControl] = useState(true);

  const {
      sceneID
    , setSceneID
    , entities
    , dispatchEntity
  } = useEntity();

  //check for game id load from props
  useEffect(()=>{
    //console.log("projectid")
    //console.log(projectid)
    if(!isEmpty(gameid)){
      console.log("found gameid:" + gameid)
      setGameID(gameid);
    }else{
      console.log("None gameid from props")
    }
  },[gameid])

  //check for game id from assign set<name>
  useEffect(()=>{
    if(!isEmpty(gameID)){
      getGameData();
    }else{
    }
  },[gameID])

  //get project data from fetch
  async function getGameData(){
    if(isEmpty(gameID)){
      console.log("Empty gameID!");
      return;
    }
    let data = await useFetch('api/project',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
        api:'PROJECT',
        projectid:gameID
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
      setGameName(data.name);
    }
  }

  //check sceneid to load entity objects
  useEffect(()=>{
    if(!isEmpty(sceneID)){
      getSceneEntities();
    }
  },[sceneID])

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
        , projectid:gameID
        , sceneid:sceneID
      })
    });
    if(data.error){
      console.log("ERROR FETCH GET ENTITIES");
      return;
    }
    //console.log(data);
    if(data.api=='ENTITIES'){
      console.log('API get entities!');
      dispatchEntity({
          type:"array"
        , entities: data.entities
      })
    }
  }

  const ContextBridge = useContextBridge(EditorContext)

  return(<>
    <Canvas>
      <ContextBridge>
      <Physics>
        {entities.map((entity)=>{
          //if(entity.isPhysics == true)
          //return EntityRenderModel(entity); //return buildModel(entity)
          // check if the object3d and Physics are enable.
          //entity.key= entity.objectid;
          if((entity?.isPhysics == true)&&(enablePhysics==true)){
            // cannon ref
            // const [ref] = useBox(() => ({ ...props }));
            return <EntityPhysicsTypes key={entity.objectid} {...entity}/>
          }else{// normal model or object
            // default ref
            // const ref= useRef()
            return <EntityObjectTypes key={entity.objectid} {...entity}/>
          }
        })}
      </Physics>
      { enableOrbitControl && <EntityOrbitControl /> }
      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
        >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      </ContextBridge>
      {/*
      */}
    </Canvas>
  </>)
}