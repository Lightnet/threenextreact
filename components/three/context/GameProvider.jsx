/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext } from "react";

export const GameContext = createContext();

export function useGame(){
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(`useGame must be used within a GameContext`)
  }
  return context;
}

export function ThreeProvider(props){
  
  const [sceneID, setSceneID] = useState('');
  const [sceneName, setSceneName] = useState('');
  const [object3Ds, setObject3Ds] = useState([]);
  const [scenes, setScenes] = useState([]);

  const [settings, setSettings] = useState({});

  const value = useMemo(()=>({
    sceneID, setSceneID,
    sceneName, setSceneName,
    scenes, setScenes,
    object3Ds, setObject3Ds,
    settings, setSettings
  }),[
    sceneID,
    sceneName,
    scenes,
    object3Ds,
    settings
  ])

  return <GameContext.Provider value={value} {...props} />
}