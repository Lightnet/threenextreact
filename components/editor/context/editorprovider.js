/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext } from "react";

export const EditorContext = createContext();

export function useEditor(){
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(`useCount must be used within a useEditor`)
  }
  return context;
}

export function useScene(){
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(`useCount must be used within a useEditor`)
  }
  const {sceneID, setSceneID} = context
  return {
    sceneID, 
    setSceneID
  }
}

export function EditorProvider(props){
  const [editorID, setEditorID] = useState('');
  const [editorName, setEditorName] = useState('');
  const [sceneID, setSceneID] = useState('');
  const [sceneName, setSceneName] = useState('');
  const [object3Ds, setObject3Ds] = useState([]);
  const [scenes, setScenes] = useState([]);

  const [selectObject, setSelectObject] = useState(null);

  const value = useMemo(()=>({
    editorID, setEditorID,
    editorName, setEditorName,
    sceneID, setSceneID,
    sceneName, setSceneName,
    scenes, setScenes,
    object3Ds, setObject3Ds,
    selectObject, setSelectObject
  }),[
    editorID,
    editorName,
    sceneID,
    sceneName,
    scenes,
    object3Ds,
    selectObject
  ])

  return <EditorContext.Provider value={value} {...props} />
}
// https://flexiple.com/react/provider-pattern-with-react-context-api/