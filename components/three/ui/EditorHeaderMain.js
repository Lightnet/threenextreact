/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react"
import Modal from "../../modal/modal";
import ThemeLink from "../../theme/themelink";
import { useEntity } from "../context/EntityProvider";
import { useProject } from "../context/ProjectProvider";
import ProjectsPage from "../ProjectsPage";
import AssetsPage from "./AssetsPage";

export default function EditorHeaderMain(){

  const{ projectName } = useProject();
  const{ enablePhysics, setEnablePhysics } = useEntity();

  const [isOpenProject, setIsOpenProject] = useState(false);
  const [isOpenAssets, setIsOpenAssets] = useState(false);

  function clickOpenProject(){
    setIsOpenProject(true)
  }
  function onCloseProject(){
    console.log("close???")
    setIsOpenProject(false);
  }

  function clickOpenAssets(){
    setIsOpenAssets(true)
  }
  function onCloseAssets(){
    console.log("close???")
    setIsOpenAssets(false);
  }

  function togglePhysics(){
    setEnablePhysics(state=>!state)
  }

  return <>
    <div style={{ //top
      position:'absolute'
      ,top:'0px'
      //,left:'0px'
      ,left:'0px'
      //,width:'100%'
      ,width:'100%'
      ,height:'28px'
      ,background:'gray'
    }}>
      <button onClick={clickOpenProject}> Projects </button>
      <button> Project </button>
      <button> Scene </button>
      <button onClick={clickOpenAssets}> Assets </button>
      <ThemeLink></ThemeLink>
      <button onClick={togglePhysics}>[ enablePhysics: {enablePhysics ? ("true"):("false")} ]</button>
      <label>[ Project: {projectName} ]</label>
    </div>

    <Modal title="Projects" pwidth="800" pheight="300" isOpen={isOpenProject} onClose={onCloseProject}>
      <ProjectsPage />
    </Modal>

    <Modal title="Assets" pwidth="800" pheight="300" isOpen={isOpenAssets} onClose={onCloseAssets}>
      <AssetsPage />
    </Modal>
  </>
}
