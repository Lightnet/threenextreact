/**
 * Blank Component
 */
// https://www.pluralsight.com/guides/how-to-show-components-conditionally-react

import { useEffect } from 'react';
import { AnimationAction } from 'three';
//import { getSession } from "next-auth/react";
//import prisma from './client';
//import React, {useState, useEffect} from "react";

export default function Component({scene,ops}) {
  /*
  useEffect(async () => { 
    console.log("scene.length");
    console.log(scene);
  }, [scene]);
  */
  
  return (<>

    <label>Scene:</label>
    <div>
    {(()=>{
      if (scene){
      //return <label>Found</label>
      
      return scene.map((_entity)=>{
        return (
          <div key={_entity.id}>
            <label> Name:{_entity.name} </label>
            <button onClick={(event)=>ops(event,{action:"select",id:_entity.id})}>Select</button>
            <button onClick={(event)=>ops(event,{action:"visible",id:_entity.id})}>Visible</button>
            <button onClick={(event)=>ops(event,{action:"remove",id:_entity.id})}>Remove</button>
          </div>
        )
      })
     
    }else{
      return <label>Empty</label>
    }
    })()}
    
    </div>


  </>);
}