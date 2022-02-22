/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext } from "react";

export const ProjectContext = createContext();

export function useProject(){
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(`useProject must be used within a ProjectContext`)
  }
  return context;
}

export function ProjectProvider(props){
  
  const [projectID, setProjectID] = useState('');
  const [projectName, setProjectName] = useState('');
  const [settings, setSettings] = useState({});

  const value = useMemo(()=>({
    projectID, setProjectID,
    projectName, setProjectName,
    settings, setSettings,
  }),[
    projectID,
    projectName,
    settings
  ])

  return <ProjectContext.Provider value={value} {...props} />
}