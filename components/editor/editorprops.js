/**
 * Blank Component
 */


//import { getSession } from "next-auth/react";
//import prisma from './client';
//import React, {useState, useEffect} from "react";
import { useEffect, useState } from 'react';

// entity

export default function Component({selectObject,ops}) {
  console.log("PROPS RENDER>>>>>>>")
  const [posX, setPosX] = useState(0); //json
  
  useEffect(async () => {
    console.log("PROPS:]]]]]upodate]]]]]]]]]",selectObject)
    if(selectObject){
      console.log("PROPS:",selectObject)
      setPosX(selectObject.position[0]);
    }
    
  });
  

  function inputX(event,id){
    console.log("x?");
    console.log(event.target.value);
    //setInputValue(event.target.value);
    //selectObject.position[0]=event.target.value;
    if(event.target.value != ""){
      ops(event,{
        action:"update"
        , type: "mesh"
        , id: id
        , key: "positionX"
        , setValue: parseFloat(event.target.value)
      });
    }
  }

  function inputY(event,id){
    console.log(event.target.value);
    //setInputValue(event.target.value);
    //selectObject.position[1]=event.target.value;
    ops(event,{
      action:"update"
      , type: "mesh"
      , id: id
      , key: "positionY"
      , setValue: parseFloat(event.target.value)
    });
  }

  function inputZ(event,id){
    //setInputValue(event.target.value);
    //selectObject.position[2]=event.target.value;
    ops(event,{
      action:"update"
      , type: "mesh"
      , id: id
      , key: "positionZ"
      , setValue: parseFloat(event.target.value)
    });
  }

  return (<>
    <div>
      <label>Props:</label>
      <div>
        {selectObject && <label>Name:{selectObject.name}</label>}
      </div>
      
      {selectObject &&
      <div>
        <label>X:<input value={posX} onChange={(e)=>inputX(e,selectObject.id)}></input></label>
        <br />
        <label>y:<input value={selectObject.position[1]}  onChange={(e)=>inputY(e,selectObject.id)}></input></label>
        <br />
        <label>z:<input value={selectObject.position[2]}  onChange={(e)=>inputZ(e,selectObject.id)}></input></label>
      </div>
      }

    </div>
  </>);
}