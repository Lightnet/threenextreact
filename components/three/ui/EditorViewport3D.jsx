/*
  LICENSE: MIT
  Created by: Lightnet

  over lap divs can't used mouse event 

*/

import React, { useMemo } from "react";
import { Physics } from "@react-three/cannon";
import { GizmoHelper, GizmoViewport, useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EntityContext, useEntity } from "../context/EntityProvider";
import { EditorContext, EditorProvider, useEditor } from "../context/EditorProvider";
import EntityObjectTypes from "../helpers/EntityObjectTypes";
import EntityPhysicsTypes from "../helpers/EntityPhysicsTypes";
import EntityTransformControl, { EntityTransformControlRef } from "../helpers/EntityTransformControl";
import EntityOrbitControl from "../entity/EntityOrbitControl";

export default function EditorViewport3D(){

  const {
    enableOrbitControl,
    setEnableOrbitControl
  }= useEditor();

  const {
      entities
    , enablePhysics
  } = useEntity();
  
  const ContextBridge = useContextBridge(EditorContext, EntityContext)
  //console.log("outside canvas enableOrbitControl:",enableOrbitControl)

  return <>

    <div style={{ //threejs canvas
      position:'absolute'
      ,top:'20px'
      //,left:'0px'
      ,left:'300px'
      //,width:'100%'
      ,width:'calc(100% - 600px)'
      ,height:'calc(100% - 40px)'
    }}>
    
    <Canvas style={{ height: "100%", width: "100%" }}>
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
      <EntityTransformControlRef/>
      
      { 
      //enableOrbitControl && <EntityOrbitControl />
      <EntityOrbitControl enabled={enableOrbitControl}/> 
      }
      <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
        >
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>
      {/*
      */}
      </ContextBridge>
    </Canvas>
    </div>
  </>
}
/*
<color attach="background" args={["gray"]} />
<EntityText2D/>
<EntityModalGLTF/>
<axesHelper/>
<arrowHelper/>
<gridHelper/>

<axisHelper/>//not used
*/