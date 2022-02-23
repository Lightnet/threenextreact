/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react"
import EntityCreate from "../create/EntityCreate"
import EntityList from "./EntityList"

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
      <label> Editor </label><br/>
      <EntityCreate/>
      <EntityList/>

    </div>
  </>
}