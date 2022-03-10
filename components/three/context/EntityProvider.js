/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext, useReducer } from "react";
import { isEmpty, nanoid32 } from "../../../lib/helper.mjs";
import { log } from "../../../lib/log.mjs";
import useFetch from "../../hook/useFetch.mjs";

export const EntityContext = createContext();

//get variables and dispatch event
export function useEntity(){
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error(`useThree must be used within a EntityContext`)
  }
  return context;
}

//get array entities and dispatch
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
    log('save entity empty fields ids.');
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
  //log(data);
  if(data.error){
    log("ERROR FETCH Save Entity!");
    //msgError('Fetch Error on Save Object3D');
    return;
  }
  log("useFetch save Entity!");
}

// fetch for delete data
async function apiDeleteEntity(id){
  if(isEmpty(id)){
    log('delete entity null.');
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
  //log(data);
  if(data.error){
    log("ERROR FETCH DELETE Entity!");
    //msgError('Fetch Error on Save Object3D');
    return;
  }
  log("useFetch delete Entity!");
}

// fetch for update data
async function apiUpdateEntity(entity){
  if(!entity){
    log('update entity null.');
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
  //log(data);
  if(data.error){
    log("ERROR FETCH UPDATE Entity!");
    //msgError('Fetch Error on Save Object3D');
    return;
  }
  log("useFetch UPDATE Entity!");
}

// this is dispatch events
function reducerEntity(state, action) {
  //log(action);
  switch (action.type) {
    // do something with the action
    case 'add':
      // do checks arg or params
      //need to do check for object, material, models
      //log(action)
      let item = {};
      item.objectid = action.id || nanoid32();
      item.name = action.name || nanoid32();
      item.children = action.children || [];
      item.position = action.position || [0,0,0];
      item.rotation = action.rotation || [0,0,0];
      item.scale = action.scale || [1,1,1];
      item.visible = action.visible || true;
      item.isPhysics = action.isPhysics || false;

      if(action.dataType){item.dataType = action.dataType;}
      if(action.dataType=="BOX"){
        item.material=[]
        item.material=[
          {
              index:0
            , objectid:nanoid32()
            , dataType:"meshStandardMaterial"
            , name:"meshStandardMaterial"
            , color:"#ff00ff"
            , wireframe:false
          }
        ]
      }
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
      //let data = state.map((item) => {
        //log(item)
        //log(action)
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
          if(action.keyType=="parameters"){
            item.parameters=action.value
          }
          if(action.keyType=="physics"){
            //log(action.value)
            item.isPhysics = action.value.isPhysics;
            item.mass = action.value.mass;
            item.shapePhysics = action.value.shapePhysics;
            //item.parameters=action.value
          }

          if(action.keyType=="material"){
            //log("MATERIAL???")
            //log(action.value)
            if(item.material){
              //log("other?")
              if(item.material.length==0){
                let material = item.material;
                item.material = [...material, {
                  index: action.value.index
                  , objectid: action.value.objectid || nanoid32()
                  , dataType: action.value.dataType
                  , name: action.value.name
                  , color: action.value.color
                  , wireframe: action.value.wireframe
                }]
              }else{
                item.material = item.material.map(obj=>{
                  //log(obj)
                  if(obj.objectid == action.value.objectid){
                    //log(obj)
                    obj.name = action.value.name
                    obj.dataType = action.value.dataType
                    obj.color = action.value.color
                    obj.wireframe = action.value.wireframe
                    return obj;
                  }
                  return obj;
                })
              }
            }else{
              item.material=[];
              let material = item.material;
              item.material = [...material, {
                index: action.value.index
                , objectid: action.value.objectid || nanoid32()
                , dataType: action.value.dataType
                , name: action.value.name
                , color: action.value.color
                , wireframe: action.value.wireframe
              }]
            }
          }

          apiUpdateEntity(item)

          return item;
          //return {...item, position: action.value};
        }
        return item;
      });

    case 'updateEntity':

      return state.map((item) => {
        //let data = state.map((item) => {
          //log(item)
          //log(action)
          if(item.objectid == action.id){
            item = action.entity;

            apiUpdateEntity(item)

            return item;
          }
          return item;
        });

    case 'remove':
      apiDeleteEntity(action.id)
      // keep every item except the one we want to remove
      return state.filter((item) => item.objectid != action.id);
    case 'array':
      log("Fetch Entities len:", action.entities.length)
      // array for loading from fetch
      if(action.entities.length ==0){
        return [];  
      }
      return action.entities;
    case 'clear':
      return [];
    case 'addMaterial':
      log("render??");
      return state.map((item) => {
        if(item.objectid == action.id){
          if(item.material){

          }else{
            log("Add Material")
            item.material=[];
          }
          return item;
        }
        return item;
      });
    case 'render':
      log("render??");
      return state.map((item) => {
        if(item.objectid == action.id){
          if(action.keyType=="material"){

          }
          return item;
        }
        return item;
      });
    default:
      return state;
  }
}

// context Provider for variable access and events
export function EntityProvider(props){
  
  const [sceneID, setSceneID] = useState('');
  const [sceneName, setSceneName] = useState('');
  const [entities, dispatchEntity] = useReducer(reducerEntity, []);
  const [scenes, setScenes] = useState([]);

  const [enablePhysics, setEnablePhysics ] = useState(false);

  const {selectObject, setSelectObject} = useState();

  const value = useMemo(()=>({
    sceneID, setSceneID,
    sceneName, setSceneName,
    scenes, setScenes,
    entities, dispatchEntity,
    enablePhysics, setEnablePhysics 
  }),[
    sceneID,
    sceneName,
    scenes,
    entities,
    enablePhysics
  ])

  return <EntityContext.Provider value={value} {...props} />
}