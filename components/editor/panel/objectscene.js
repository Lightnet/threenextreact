/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import { useScene } from "../context/editorprovider";

// https://www.pluralsight.com/guides/how-to-show-components-conditionally-react

//import { useEffect } from 'react';
//import { AnimationAction } from 'three';
//import { getSession } from "next-auth/react";
//import prisma from './client';
//import React, {useState, useEffect} from "react";

function ranName(length){
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function Component({sceneObjs,ops}) {

  const [sceneID, setSceneID] = useScene();
  
  const [object3D, setObject3D] = useState([]);

  useEffect(() => {
    //console.log("objectscene sceneID:",sceneID);
  }, [sceneID]);

  useEffect(() => {
    if(sceneObjs){
      setObject3D(sceneObjs);
    }
    return ()=>{
      setObject3D(null);
    }
  }, [sceneObjs]);

  function renderSceneObjects(){
    if (object3D){
      //return <label>Found</label>
      return object3D?.map((_entity)=>{
        return (
          <div key={_entity.id}>
            <label> Name:{_entity?.name} </label>
            {/*<button onClick={()=>testset(_entity.id,"testss")}>SET</button>*/}
            <button onClick={()=>ops({action:"rename",id:_entity.id,name:ranName(10)})}>Rename</button>
            <button onClick={()=>ops({action:"select",id:_entity.id})}>Select</button>
            <button onClick={()=>ops({action:"visible",id:_entity.id})}>Visible</button>
            <button onClick={()=>ops({action:"remove",id:_entity.id})}>Remove</button>
          </div>
        )
      })
    }
    return <div><label>Empty</label></div>
  }
  
  return (<>
    <div>
      <label>ID Scene: {sceneID}</label>
    </div>
    <div>
      <label>Object3Ds:</label>
    </div>
    <div>
      {renderSceneObjects()}
    </div>
  </>);
}