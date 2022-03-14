/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from 'react';
import { isEmpty, nanoid16 } from '../../../lib/helper.mjs';
import useFetch from '../../hook/useFetch.mjs';
import Modal from '../../modal/Modal.jsx';
import API from '../context/API.mjs';
import { useEntity } from '../context/EntityProvider';
import { useProject } from '../context/ProjectProvider';

export default function EntityScenes(){

  const {projectID} = useProject();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [viewModel, setViewModel] = useState("");
  const [sceneID, setSceneID] = useState("");
  const [sceneName, setSceneName] = useState("");
  const [sceneDescription, setSceneDescription] = useState("");

  const {
    scenes
    , setScenes
    , setSceneID: _setSceneID
    , setSceneName: _setSceneName
  } = useEntity();

  useEffect(()=>{
    if(isEmpty(projectID)){
      return;
    }
    getScenes();
  },[projectID])

  //modal
  const onCloseModal = e=>setIsOpenModal(false);

  //inputs
  const typeName = e=>setSceneName(e.target.value);
  const typeDescription = e=>setSceneDescription(e.target.value);

  // get scenes data
  async function getScenes(){
    //console.log(projectID);
    let data = await useFetch("/api/scene",{
        method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
        api:'SCENES',
        projectid:projectID
      })
    })
    if(data.error){
      console.log("ERROR FETCH GET ASSETS");
      return;
    }
    //console.log(data);
    if(data.api=="SCENES"){
      setScenes(data.scenes)
    }
  }

  // open modal create scene
  function clickCreateScene(){
    setViewModel("create")
    setIsOpenModal(true)
  }

  // create scene api
  async function clickCreateScenData(){
    if(isEmpty(sceneName)){
      console.log("Empty Field!")
      return;
    }
    let data = await useFetch("/api/scene",{
        method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
          api:API.CREATE
        , projectid:projectID
        , name:sceneName
        , description:sceneDescription || nanoid16()
      })
    })
    if(data.error){
      console.log("ERROR FETCH GET ASSETS");
      return;
    }
    console.log(data);
    if(data.api==API.CREATE){
      //setScenes(data.scene)
      let scene ={objectid:data.scene.objectid,name:data.scene.name};
      setScenes(state=>[...state, scene])
      setIsOpenModal(false)
    }
  }

  // open modal edit scene info
  function clickOpenEdit(id){
    for(let idx in scenes){
      if(scenes[idx].objectid == id){
        setSceneID(id);
        setSceneName(scenes[idx].name);
        setSceneDescription(scenes[idx].description);
        break;
      }
    }
    setViewModel("edit")
    setIsOpenModal(true)
  };

  // update scene info data
  async function clickUpdateSceneInfo(){
    let data = await useFetch("/api/scene",{
        method:'PUT'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
          api:API.UPDATE
        , id:sceneID
        , name:sceneName
        , description:sceneDescription
      })
    })
    if(data.error){
      console.log("ERROR FETCH GET ASSETS");
      return;
    }
    console.log(data);
    if(data.api==API.UPDATE){
      //setScenes(data.scenes)
      setScenes(state=>state.map(item=>{
        if(item.objectid == data.scene.objectid){
          item.name = data.scene.name;
          item.description = data.scene.description;
          return item;  
        }
        return item;
      }))
    }
  }

  // open modal delete scene
  function clickDeleteScene(id){
    for(let idx in scenes){
      if(scenes[idx].objectid == id){
        setSceneID(id);
        setSceneName(scenes[idx].name);
        setSceneDescription(scenes[idx].description);
        break;
      }
    }
    setViewModel("delete")
    setIsOpenModal(true)
  }

  // delete scene data
  async function clickDeleteSceneData(){
    //console.log("DELETE?")
    let data = await useFetch("/api/scene",{
        method:API.DELETE
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
          api:API.DELETE
        , id:sceneID
      })
    })
    if(data.error){
      console.log("ERROR FETCH DELETE Scene");
      return;
    }
    console.log(data);
    if(data.api==API.DELETE){
      //setScenes(data.scenes)
      setScenes(state=>state.filter(item=>item.objectid != data.id))
      setIsOpenModal(false)
    }
  }

  // make default load scene id
  function clickDefaultScene(id){
    for(let idx in scenes){
      if(scenes[idx].objectid == id){
        setSceneID(id);
        setSceneName(scenes[idx].name);
        setSceneDescription(scenes[idx].description);
        break;
      }
    }
    setViewModel("default")
    setIsOpenModal(true)
  }

  // update project default scene load
  async function clickDefaultSceneData(){
    //console.log("DELETE?")
    let data = await useFetch("/api/scene",{
        method:API.PUT
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
          api:API.DEFAULT
        , projectid:projectID
        , id:sceneID
      })
    })
    if(data.error){
      console.log("ERROR FETCH DELETE Scene");
      return;
    }
    console.log(data);
    if(data.api==API.UPDATE){
      //setScenes(data.project)
      setIsOpenModal(false)
    }
  }

  function clickLoadScene(id){
    for(let idx in scenes){
      if(scenes[idx].objectid == id){
        setSceneID(id);
        setSceneName(scenes[idx].name);
        setSceneDescription(scenes[idx].description);

        _setSceneName(scenes[idx].name)
        _setSceneID(id)
        
        break;
      }
    }

    setSceneID(id);
  }

  // list scenes
  function renderScenes(){
    return scenes.map(item=>{
      //console.log(item.objectid);
      return <div key={item.objectid}>
        <label> Name: {item.name} </label> 
        <button onClick={()=>clickOpenEdit(item.objectid)}> Edit </button>
        <button onClick={()=>clickDefaultScene(item.objectid)}> Default Load </button>
        <button onClick={()=>clickLoadScene(item.objectid)}> Load </button>
        <button onClick={()=>clickDeleteScene(item.objectid)}> Delete </button>
      </div>
    })
  }

  //render modal type set to view.
  function renderModalType(){
    if(viewModel=="edit"){
      return <>
        <label> Name: </label> <input value={sceneName} onChange={typeName} /><br/>
        <label> Description: </label> <input value={sceneDescription} onChange={typeDescription} /><br/>
        <button onClick={clickUpdateSceneInfo}> Update </button>
      </>
    }
    if(viewModel=="create"){
      return <>
        <label> Name: </label> <input value={sceneName} onChange={typeName} /><br/>
        <label> Description: </label> <input value={sceneDescription} onChange={typeDescription} /><br/>
        <button onClick={clickCreateScenData}> Create </button>
      </>
    }
    if(viewModel=="delete"){
      return <>
        <label> ID: </label> <label> {sceneID} </label> <br/>
        <label> Name: </label> <label> {sceneName} </label> <br/>
        <label> Description: </label> <label> {sceneDescription} </label><br/>
        <button onClick={clickDeleteSceneData}> Delete </button>
      </>
    }
    if(viewModel=="default"){
      return <>
        <label> ID: </label> <label> {sceneID} </label> <br/>
        <label> Name: </label> <label> {sceneName} </label> <br/>
        <label> Description: </label> <label> {sceneDescription} </label><br/>
        <button onClick={clickDefaultSceneData}> Default Scene? </button>
      </>
    }
    return <></>
  }

  return <>
    <div>
      <div>
        <label> Scenes </label> <button onClick={clickCreateScene}> Create </button>
      </div>
      <div>
        {renderScenes()}
      </div>
    </div>
    <Modal isOpen={isOpenModal} onClose={onCloseModal} isdrag={false}>
      {
      renderModalType()
      }
    </Modal>
  </>
}