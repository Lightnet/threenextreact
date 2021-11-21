import React,{ createContext, useState, useMemo, useContext } from "react";

export const EditorContext = createContext();

export function useEditor(){
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(`useCount must be used within a UserContext`)
  }
  //console.log(context);
  //const {editorID, setEditorID} = context
  //return {
    //editorID, 
    //setEditorID
  //}
  return context;
}

export function useScene(){
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(`useCount must be used within a UserContext`)
  }
  const {sceneID, setSceneID} = context
  return {
    sceneID, 
    setSceneID
  }
}

export function EditorProvider(props){
  const [editorID, setEditorID] = useState(null);
  const [sceneID, setSceneID] = useState(null);
  //const [object3Ds, setObject3Ds] = useState([]);

  const value = useMemo(()=>({
    editorID, setEditorID,
    sceneID, setSceneID
  }),[
    editorID,
    sceneID
  ])

  return <EditorContext.Provider value={value} {...props} />
}

// https://flexiple.com/react/provider-pattern-with-react-context-api/