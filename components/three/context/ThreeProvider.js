/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext } from "react";

export const ThreeContext = createContext();

export function useThree(){
  const context = useContext(ThreeContext);
  if (!context) {
    throw new Error(`useThree must be used within a ThreeContext`)
  }
  return context;
}

export function ThreeProvider(props){
  
  const [sceneID, setSceneID] = useState('');
  const [sceneName, setSceneName] = useState('');
  const [object3Ds, setObject3Ds] = useState([]);
  const [scenes, setScenes] = useState([]);

  const [selectObject, setSelectObject] = useState(null);

  const value = useMemo(()=>({
    sceneID, setSceneID,
    sceneName, setSceneName,
    scenes, setScenes,
    object3Ds, setObject3Ds,
    selectObject, setSelectObject
  }),[
    sceneID,
    sceneName,
    scenes,
    object3Ds,
    selectObject
  ])

  return <ThreeContext.Provider value={value} {...props} />
}