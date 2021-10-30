/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getSession } from "next-auth/react";
//import prisma from './client';
//import React, {useState, useEffect} from "react";
import { useEffect, useState } from 'react';

import InputProp from "../editor/inputProp";

import TransformProp from "../editor/transform";

// entity

export default function Component({selectObject,ops}) {
  console.log("PROPS RENDER>>>>>>>")
  
  useEffect(async () => {
    //console.log("PROPS:]]]]]upodate]]]]]]]]]",selectObject)

  });
  
  return (<>
    <div>
      <label>Props:</label>
      <div>
        {selectObject && <label>Name:{selectObject.name}</label>}
      </div>
      
      {selectObject &&
        <TransformProp
          ops={ops}
          selectObject={selectObject}
          />
      }
    </div>
  </>);
}
/*

      <div>
        <label>X:<input value={posX} onChange={(e)=>inputX(e,selectObject.id)}></input></label>
        <InputProp 
          selectObject={selectObject}
          ops={ops}
          objKey="positionX"
          type="mesh"
        />

        <br />
        <label>y:<input value={selectObject.position[1]}  onChange={(e)=>inputY(e,selectObject.id)}></input></label>
        <br />
        <label>z:<input value={selectObject.position[2]}  onChange={(e)=>inputZ(e,selectObject.id)}></input></label>
      </div>

*/