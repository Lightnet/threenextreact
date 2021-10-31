/*
  LICENSE: MIT
  Created by: Lightnet
*/

//import { getSession } from "next-auth/react";
//import prisma from './client';
//import React, {useState, useEffect} from "react";
import { useEffect, useState } from 'react';

//import InputProp from "../editor/inputProp";

import TransformProp from "../editor/transform";
import RotationProp from "../editor/rotation";

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

      {selectObject &&
        <RotationProp
          ops={ops}
          selectObject={selectObject}
          />
      }

    </div>
  </>);
}
