/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from 'react';
import CreateEntityObject from '../create/CreateEntityObject';
import EntityList from '../ui/EntityList';
import EntityScenes from './EntityScenes';
import EntitySelectUpdate from './EntitySelectUpdate';

export default function EntityViewProperty({view,style}){

  const [viewType, setViewType] = useState("Scenes");
  const [_style, setStyle] = useState({});
  const [views, setViews] = useState([
      "Scenes"
    , "Create Entity"
    , "Create Entity Object"
    , "Entity Object"
    , "Entity List"
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

  function renderView(){
    //log("viewType:", viewType)
    //log(typeof viewType)
    if(viewType == "Create Entity Object"){
      return <CreateEntityObject/>
    }else if(viewType == "Entity List"){
      return <EntityList/>
    }else if(viewType == "Entity Object"){
      return <EntitySelectUpdate/>
    }else if(viewType == "Scenes"){
      return <EntityScenes/>
    }else{
      return <></>
    }
  }

  function onSelectView(e){
    setViewType(e.target.value);
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