/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react"
import Modal from "../../modal/Modal";
import ThemeLink from "../../theme/ThemeLink";
import { useEntity } from "../context/EntityProvider";
import { useProject } from "../context/ProjectProvider";
import AssetsPage from "./AssetsPage";
import EditorProjectsPage from "./EditorProjectsPage";

export default function EditorHeaderMain(){

  const{ projectID, projectName,setProjectID } = useProject();
  const{ enablePhysics, setEnablePhysics } = useEntity();

  const [isOpenProject, setIsOpenProject] = useState(false);
  const [isOpenAssets, setIsOpenAssets] = useState(false);

  function clickOpenProject(){
    setIsOpenProject(true)
  }
  function onCloseProject(){
    //console.log("close???")
    setIsOpenProject(false);
  }

  function clickOpenAssets(){
    setIsOpenAssets(true)
  }
  function onCloseAssets(){
    //console.log("close???")
    setIsOpenAssets(false);
  }

  function togglePhysics(){
    setEnablePhysics(state=>!state)
  }

  function clickDebug(){
    window.open(("/game?gameid="+projectID), "_ThreeDebug");
  }

  function onLoadProject(e){

    setProjectID(e.target.value)
  }

  return <>
    <div style={{ //top
      position:'absolute'
      ,top:'0px'
      //,left:'0px'
      ,left:'0px'
      //,width:'100%'
      ,width:'100%'
      ,height:'20px'
      ,background:'gray'
    }}>
      <button onClick={clickOpenProject}> Projects </button>
      <button> Project </button>
      <button> Scene </button>
      <button onClick={clickOpenAssets}> Assets </button>
      <ThemeLink></ThemeLink>
      <button onClick={togglePhysics}>[ enablePhysics: {enablePhysics ? ("true"):("false")} ]</button>
      <button onClick={clickDebug}> Debug </button>

      <label>[ Project: {projectName} ]</label>
    </div>

    <Modal title="Projects" pwidth="800" pheight="300" isOpen={isOpenProject} onClose={onCloseProject}>
      <EditorProjectsPage onLoadEditor={onLoadProject} />
    </Modal>

    <Modal title="Assets" pwidth="800" pheight="300" isOpen={isOpenAssets} onClose={onCloseAssets}>
      <AssetsPage />
    </Modal>
  </>
}
