/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react"
import EntitySelectUpdate from "../property/EntitySelectUpdate"

export default function EditorSidebarMainRight(){
  
  return <>
    <div style={{//right bar
      position:'absolute'
      ,top:'28px'
      ,right:'0px'
      ,width:'300px'
      ,height:'calc(100% - 56px)'
      ,background:'#778899'
      ,overflow: "scroll"
    }}>
      {/* over lap can used mouse event */}
      <label> Editor </label><br/>
      <EntitySelectUpdate/>
    </div>
  </>
}