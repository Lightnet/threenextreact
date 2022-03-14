/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react"
import API from "../context/API.mjs"
import EntityViewProperty from "../property/EntityViewProperty"

export default function EditorSidebarMainLeft(){
  
  return <>
    <div style={{//left bar
      position:'absolute'
      ,top:'28px'
      ,left:'0px'
      ,width:'300px'
      ,height:'calc(100% - 56px)'
      ,background:'#778899'
    }}>
      {/* over lap can used mouse event */}
      <EntityViewProperty style={{height:"50%"}} view={API.VIEWS.CREATEENTITYOBJECT} />
      <EntityViewProperty style={{height:"50%"}} view={API.VIEWS.ENTITYSCENEOBJECTS} />
    </div>
  </>
}