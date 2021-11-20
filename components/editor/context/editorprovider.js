import React,{ createContext, useState, useMemo, useContext } from "react";

export const EditorContext = createContext();

export function useEditor(){
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(`useCount must be used within a UserContext`)
  }
  //console.log(context);
  //console.log(context);
  //console.log(context);
  //console.log(context);
  //console.log(context);
  //console.log(context);

  const {editorID, setEditorID} = context
  return [
    editorID, 
    setEditorID
  ]
}

export function useScene(){
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(`useCount must be used within a UserContext`)
  }
  const {sceneID, setSceneID} = context
  return [
    sceneID, 
    setSceneID
  ]
}

export function EditorProvider(props){
  const [editorID, setEditorID] = useState(null);
  const [sceneID, setSceneID] = useState(null);

  //const value0 = useMemo(()=>[editorID, setEditorID],[editorID])
  //console.log("value0>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  //console.log(value0)
  //console.log("value0>>>>>>>>>>>>>>>>>]]]]]]]]]]]]]]]]]]]]]");
  //const value1 = useMemo(()=>[sceneID, setSceneID],[sceneID])

  //const value ={
    //value0,
    //value1
  //}

  //const value = {editorID:editorID,setEditorID:setEditorID,sceneID:sceneID,setSceneID:setSceneID}
  const value = {editorID:editorID,setEditorID:setEditorID,sceneID:sceneID,setSceneID:setSceneID}

  return <EditorContext.Provider value={value} {...props} />
}

/*
 <AppContext.Provider
       value={{
         state: this.state,
         updateLocale: this.updateLocalCode,
         updateTheme: this.updateTheme
       }}
     >
*/
// https://flexiple.com/react/provider-pattern-with-react-context-api/