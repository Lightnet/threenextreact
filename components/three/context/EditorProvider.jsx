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
  const [selectObjectID, setSelectObjectID] = useState("");
  const [selectObjectUUID, setSelectObjectUUID] = useState("");
  const [enableOrbitControl, setEnableOrbitControl] = useState(true);

  const [deleteObjectID, setDeleteObjectID] = useState("");

  const value = useMemo(()=>({
    editorID, setEditorID,
    editorName, setEditorName,
    settings, setSettings,
    selectObject, setSelectObject,
    enableOrbitControl, setEnableOrbitControl,
    selectObjectID, setSelectObjectID,
    deleteObjectID, setDeleteObjectID,
    selectObjectUUID, setSelectObjectUUID
  }),[
    editorID,
    editorName,
    settings,
    selectObject,
    selectObjectID,
    enableOrbitControl,
    deleteObjectID,
    selectObjectUUID
  ])

  return <EditorContext.Provider value={value} {...props} />
}