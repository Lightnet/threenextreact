/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getSession } from "next-auth/react";
//import prisma from './client';
//import InputProp from "../editor/inputProp";
import React,{ useEffect, useState } from 'react';
import ObjectPosition from "./objectposition";
import RotationProp from "./objectrotation";
import ScaleProp from "./objectscale";

// entity
export default function ObjectProps({selectObject,ops}) {
  //console.log("PROPS RENDER>>>>>>>")
  //useEffect(() => {
    //console.log("PROPS:]]]]]upodate]]]]]]]]]",selectObject)
  //});
  
  return (<>
    <div>
      <label>Props:</label>
      <div>
        {selectObject && <label>Name:{selectObject.name}</label>}
      </div>
      
      {selectObject &&
        <ObjectPosition
          ops={ops}
          selectObject={selectObject}
          />
      }

      {selectObject &&
        <RotationProp
          ops={ops}
          selectObject={selectObject}
          />
      }

      {selectObject &&
        <ScaleProp
          ops={ops}
          selectObject={selectObject}
          />
      }

    </div>
  </>);
}
