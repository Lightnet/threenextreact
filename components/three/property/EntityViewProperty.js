/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from 'react';
import EntityCreate from '../create/EntityCreate';
import EntityList from '../ui/EntityList';
import EntityScenes from './EntityScenes';
import EntitySelectUpdate from './EntitySelectUpdate';

export default function EntityViewProperty({view}){

  const [viewType, setViewType] = useState("Scenes")
  const [views, setViews] = useState([
      "Scenes"
    , "Create Entity"
    , "Entity Object"
    , "Entity List"
  ])

  useEffect(()=>{
    if(typeof view != "undefined"){
      setViewType(view);
    }
  },[view])

  function renderView(){
    //console.log("viewType:", viewType)
    //console.log(typeof viewType)
    if(viewType == "Create Entity"){
      return <EntityCreate/>
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
    <div>
      <div>
        <label> View </label>
        <select value={viewType} onChange={onSelectView}>
          {views.map(item=><option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div>
        {renderView()}
      </div>
    </div>
  </>
}