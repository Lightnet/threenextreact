/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext } from "react";

export const EditorContext = createContext();

export function useEditor(){
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(`useEditor must be used within a EditorContext`)
  }
  return context;
}

export function EditorProvider(props){
  
  const [editorID, setEditorID] = useState('');
  const [editorName, setEditorName] = useState('');
  const [settings, setSettings] = useState({});

  const [selectObject, setSelectObject] = useState(null);
  const [enableOrbitControl, setEnableOrbitControl] = useState(true);

  const value = useMemo(()=>({
    editorID, setEditorID,
    editorName, setEditorName,
    settings, setSettings,
    selectObject, setSelectObject,
    enableOrbitControl, setEnableOrbitControl
  }),[
    editorID,
    editorName,
    settings,
    selectObject,
    enableOrbitControl
  ])

  return <EditorContext.Provider value={value} {...props} />
}