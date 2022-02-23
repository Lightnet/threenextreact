/*
  LICENSE: MIT
  Created by: Lightnet

  over lap divs can't used mouse event 

*/

import React from "react";
import { Physics } from "@react-three/cannon";
import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEntity } from "../context/EntityProvider";
import EntityOrbitControl from "../entity/EntityOrbitControl";
import EntityRenderModel from "../EntityRenderModel";
import { useEditor } from "../context/EditorProvider";

export default function Viewport3D(){

  const {
    enableOrbitControl
  }= useEditor();

  const {
      entities
    , dispatchEntity
  } = useEntity();

  return <>

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
  
  
  </>
}