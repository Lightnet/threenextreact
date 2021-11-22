/*
  LICENSE: MIT
  Created by: Lightnet

  view port for scene?

*/

import { useState, useEffect } from "react";
import { useEditor, useScene } from "../context/editorprovider";
import useFetch from "../../hook/usefetch";
import { isEmpty } from "../../../lib/helper";

export default function PropScene({ops}) {

  const {editorID, setEditorID} = useEditor();

  const { sceneID, setSceneID} = useScene();
  const {scenes, setScenes} = useEditor();

  const {sceneName,setSceneName} =useEditor();

  const [isEdit,setIsEdit]=useState(false);
  const [editName,setEditName]=useState(false);
  const [selectID,setSelectID]=useState('');

  useEffect(() => {
    console.log("get scene")
    if(sceneID){
      for(let scene of scenes){
        if(scene.id  == sceneID){
          setSceneName(scene.name)
          break;
        }
        break;
      }
    }
    return  ()=>{
      console.log('propscene clean');
    }
  },[sceneID]);
  
  function typeEditName(e){
    setEditName(e.target.value);
  }

  function enterEditName(event){
    if (event.keyCode === 13) {
      //check for string empty
      if(isEmpty(event.target.value)){
        console.log("Empty!");
        return;
      }
      updateNameScene();
      
      setIsEdit(false);
    }
  }

  return (<>
  <div>
    <div>
      <label>ID:{sceneID}</label>
    </div>
    <div>
      <label>Name: {sceneName}</label>
    </div>

    <div>
      <label>Scene settings</label>
    </div>
    
  </div>
    </>);
}