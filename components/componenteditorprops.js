/**
 * Blank Component
 */

//import { useEffect } from 'react';
//import { getSession } from "next-auth/react";
//import prisma from './client';
//import React, {useState, useEffect} from "react";

// entity

export default function Component({selectObject,ops}) {
  /*
  useEffect(async () => { 

  }, []);
  */

  function inputX(event){
    console.log("x?");
    console.log(event.target.value);
    //setInputValue(event.target.value);
    selectObject.position[0]=event.target.value;
  }

  function inputY(event){
    console.log(event.target.value);
    //setInputValue(event.target.value);
    selectObject.position[1]=event.target.value;
  }

  function inputZ(event){
    //setInputValue(event.target.value);
    selectObject.position[2]=event.target.value;
  }

  return (<>
    <div>
      <label>Props:</label>
      <div>
        {selectObject && <label>Name:{selectObject.name}</label>}
      </div>
      
      {selectObject &&
      <div>
      <label>X:<input value={selectObject.position[0]} onChange={inputX}></input></label>
      <br />
        <label>y:<input value={selectObject.position[1]}  onChange={inputY}></input></label>
        <br />
        <label>z:<input value={selectObject.position[2]}  onChange={inputZ}></input></label>
      </div>
      }

    </div>
  </>);
}