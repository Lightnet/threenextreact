/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from 'react';
import API from '../context/API.mjs';
import CreateEntityObject from '../create/CreateEntityObject';
import EntitySceneObjects from '../ui/EntitySceneObjects';
import EntityScenes from './EntityScenes';
import EntitySelectObject from './EntitySelectObject';

export default function EntityViewProperty({view,style}){

  const [viewType, setViewType] = useState("Scenes");
  const [_style, setStyle] = useState({});
  const [views, setViews] = useState([
      API.VIEWS.SCENES
    , API.VIEWS.CREATEENTITYOBJECT
    , API.VIEWS.ENTITYSELECTOBJECT
    , API.VIEWS.ENTITYSCENEOBJECTS
  ])

  useEffect(()=>{
    if(typeof style != "undefined"){
      setStyle(style);
    }
  },[style])

  useEffect(()=>{
    if(typeof view != "undefined"){
      setViewType(view);
    }
  },[view])

  function onSelectView(e){
    setViewType(e.target.value);
  }

  function renderView(){
    //log("viewType:", viewType)
    //log(typeof viewType)
    if(viewType == API.VIEWS.CREATEENTITYOBJECT){
      return <CreateEntityObject/>
    }else if(viewType == API.VIEWS.ENTITYSCENEOBJECTS){
      return <EntitySceneObjects/>
    }else if(viewType == API.VIEWS.ENTITYSELECTOBJECT){
      return <EntitySelectObject/>
    }else if(viewType == API.VIEWS.SCENES){
      return <EntityScenes/>
    }else{
      return <></>
    }
  }

  return <>
    <div style={_style}>
      <div>
        <label> View </label>
        <select value={viewType} onChange={onSelectView}>
          {views.map(item=><option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div style={{height:"calc(100% - 19px)"}} >
        {renderView()}
      </div>
    </div>
  </>
}