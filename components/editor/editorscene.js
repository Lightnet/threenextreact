/**
 * Blank Component
 */
// https://www.pluralsight.com/guides/how-to-show-components-conditionally-react

import { useEffect } from 'react';
import { AnimationAction } from 'three';
//import { getSession } from "next-auth/react";
//import prisma from './client';
//import React, {useState, useEffect} from "react";

export default function Component({sceneObjs,ops}) {
  
  useEffect(async () => { 
    console.log("panel scene");
    console.log(sceneObjs);
  }, [sceneObjs]);
  
  function testset(id,text){
    console.log("Checkiong...");
    let objs =sceneObjs.current;
    
    for(let i =0;i<objs.length;i++){
      if(objs[i].id == id){
        //console.log("FOUND",objs[i].id);
        console.log("FOUND",objs[i]);
        objs[i].name=text;
        sceneObjs.current=objs;
        break;
      }
    }
  }

  function ranName(length){
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
  }

  return (<>
    <label>Scene:</label>
    <div>
      {(()=>{
        if (sceneObjs){
        //return <label>Found</label>
        
        return sceneObjs.map((_entity)=>{
          return (
            <div key={_entity.id}>
              <label> Name:{_entity.name} </label>
              {/*<button onClick={()=>testset(_entity.id,"testss")}>SET</button>*/}
              <button onClick={(event)=>ops(event,{action:"rename",id:_entity.id,name:ranName(10)})}>Rename</button>
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