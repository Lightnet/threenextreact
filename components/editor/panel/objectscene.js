/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import { isEmpty } from "../../../lib/helper";
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

export default function Component({object3ds,ops}) {

  const {sceneID, setSceneID} = useScene();
  const [object3Ds, setObject3Ds] = useState([]);

  const [object3DID, setObject3DID] = useState('');
  const [objectMame, setObjectName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  //useEffect(() => {
    //console.log("objectscene sceneID:",sceneID);
  //}, [sceneID]);

  useEffect(() => {
    if(object3ds){
      setObject3Ds(object3ds);
    }
    return ()=>{
      setObject3Ds(null);
    }
  }, [object3ds]);

  function btnEdit(id){
    for(const obj3d of object3Ds){
      if(obj3d.id == id){
        setObjectName(obj3d.name)
        break;
      }
    }
    setObject3DID(id);
    setIsEdit(!isEdit)
  }

  function onChangeObjectName(e){
    setObjectName(e.target.value);
  }

  function inputKeyObject3DName(event){
    if (event.keyCode === 13) {
      //check for string empty
      if(isEmpty(event.target.value)){
        console.log("Empty!");
        return;
      }
      console.log(typeof ops);
      //check for function exist
      if(typeof ops !== 'undefined'){
        ops({
          action:"rename",
          id:object3DID,
          name:objectMame
        });
      }
      setIsEdit(false);
    }
  }

  function renderSceneObjects(){
    if (object3Ds){
      //return <label>Found</label>
      return object3Ds?.map((_entity)=>{
        return (
          <div key={_entity.id}>
            {(isEdit==true && object3DID== _entity.id)? (
              <input value={objectMame} onChange={onChangeObjectName} onKeyUp={inputKeyObject3DName}></input>
            ):(
              <label> Name:{_entity?.name} </label>
            )}
            
            <img src="/icon/edit01.svg" className="imgicon" width="16" height="16" onClick={()=>btnEdit(_entity.id)} />
            <img src="/icon/select01.svg" className="imgicon" width="16" height="16" onClick={()=>ops({action:"select",id:_entity.id})} />
            <img src="/icon/visibleeye01.svg" className="imgicon" width="16" height="16" onClick={()=>ops({action:"visible",id:_entity.id})} />
            <img src="/icon/delete01.svg" className="imgicon" width="16" height="16" onClick={()=>ops({action:"remove",id:_entity.id})} />
                        
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