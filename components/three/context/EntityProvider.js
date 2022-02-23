/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext, useReducer } from "react";
import { isEmpty, nanoid32 } from "../../../lib/helper.mjs";
import useFetch from "../../hook/usefetch.js";

export const EntityContext = createContext();

export function useEntity(){
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error(`useThree must be used within a EntityContext`)
  }
  return context;
}

export function useEntities(){
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error(`useEntity must be used within a ThreeContext`)
  }
  //return context;
  const {entities,dispatchEntity} = context;
  return [entities,dispatchEntity];
}

// fetch for saving data
async function apiSaveEntity(projectid, sceneid, entity){
  if(isEmpty(projectid)||isEmpty(sceneid)){
    console.log('save entity empty fields ids.');
    return;
  }
  let data = await useFetch('api/entity',{
    method:'POST'
    , headers: {"Content-Type": "application/json"}
    , body:JSON.stringify({ 
        api:'CREATE'
      , projectid: projectid
      , sceneid: sceneid
      , data:entity})
  });
  //console.log(data);
  if(data.error){
    console.log("ERROR FETCH Save Entity!");
    //msgError('Fetch Error on Save Object3D');
    return;
  }
  console.log("useFetch save Entity!");
}

// fetch for delete data
async function apiDeleteEntity(id){
  if(isEmpty(id)){
    console.log('delete entity null.');
    return;
  }
  let data = await useFetch('api/entity',{
    method:'DELETE'
    , headers: {"Content-Type": "application/json"}
    , body:JSON.stringify({ 
        api:'DELETE'
      , objectid: id
    })
  });
  //console.log(data);
  if(data.error){
    console.log("ERROR FETCH DELETE Entity!");
    //msgError('Fetch Error on Save Object3D');
    return;
  }
  console.log("useFetch delete Entity!");
}

// fetch for update data
async function apiUpdateEntity(entity){
  if(!entity){
    console.log('update entity null.');
    return;
  }
  let data = await useFetch('api/entity',{
    method:'PUT'
    , headers: {"Content-Type": "application/json"}
    , body:JSON.stringify({ 
        api:'UPDATE'
      , data: entity
    })
  });
  //console.log(data);
  if(data.error){
    console.log("ERROR FETCH UPDATE Entity!");
    //msgError('Fetch Error on Save Object3D');
    return;
  }
  console.log("useFetch UPDATE Entity!");
}

// this is dispatch events
function reducerEntity(state, action) {
  //console.log(action);
  switch (action.type) {
    // do something with the action
    case 'add':
      // do checks arg or params
      //need to do check for object, material, models

      console.log(action)
      let item = {};
      item.objectid = action.id || nanoid32();
      item.name = action.name || nanoid32();
      item.children = action.children || [];
      item.position = action.position || [0,0,0];
      item.rotation = action.rotation || [0,0,0];
      item.scale = action.scale || [1,1,1];
      item.visible = action.visible || true;

      if(action.dataType){item.dataType = action.dataType;}
      if(action.parameters){item.parameters = action.parameters;}

      if(action.shapePhysics){
        item.shapePhysics = action.shapePhysics;
        item.mass = action.mass;
      }

      apiSaveEntity(action.projectid, action.sceneid ,item);

      return [...state,item];

    case 'update':
      
      // keep every item except the one we want to remove
      return state.map((item) => {
        if(item.objectid == action.id){
          if(action.keyType=="position"){
            item.position=action.value
          }
          if(action.keyType=="rotation"){
            item.rotation=action.value
          }
          if(action.keyType=="scale"){
            item.scale=action.value
          }
          apiUpdateEntity(item)
          return item;
          //return {...item, position: action.value};
        }
        return item;
      });

    case 'remove':
      apiDeleteEntity(action.id)
      // keep every item except the one we want to remove
      return state.filter((item) => item.objectid != action.id);
    case 'array':
      console.log("Entities len:", action.entities.length)
      // array for loading from fetch
      if(action.entities.length ==0){
        return state;  
      }
      return action.entities;
    case 'clear':
      return [];
    default:
      return state;
  }
}

export function EntityProvider(props){
  
  const [sceneID, setSceneID] = useState('');
  const [sceneName, setSceneName] = useState('');
  const [entities, dispatchEntity] = useReducer(reducerEntity, []);
  const [scenes, setScenes] = useState([]);

  const value = useMemo(()=>({
    sceneID, setSceneID,
    sceneName, setSceneName,
    scenes, setScenes,
    entities, dispatchEntity
  }),[
    sceneID,
    sceneName,
    scenes,
    entities
  ])

  return <EntityContext.Provider value={value} {...props} />
}