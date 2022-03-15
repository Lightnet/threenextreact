/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://ultimatecourses.com/blog/query-strings-search-params-react-router

import React, { useEffect, useState } from "react";
import { EditorProvider } from "./context/EditorProvider.jsx";
import { ProjectProvider } from "./context/ProjectProvider.jsx";
import { EntityProvider } from "./context/EntityProvider.jsx";
import Editor from "./Editor.jsx";
import {
  useSearchParams
} from "react-router-dom";
import { isEmpty } from "../../lib/helper.mjs";

export default function EditorPage({projectid}){

  const [projectID, setProjectID] = useState("");
  const [searchParams] = useSearchParams();

  //check for call project from parent
  //check for url params
  useEffect(()=>{
    //console.log(projectid);
    if(!isEmpty(projectid)){
      setProjectID(projectID)
    }else{
      //console.log("props.projectid NULL!")
    }
  },[projectid])

  useEffect(()=>{
    const currentParams = Object.fromEntries([...searchParams]);
    //console.log(currentParams);
    if(currentParams?.projectid){
      setProjectID(currentParams.projectid)
    }
  },[searchParams])

  return(<>
    <ProjectProvider>
      <EditorProvider>
        <EntityProvider>
          <Editor projectid={projectID}></Editor>
        </EntityProvider>
      </EditorProvider>
    </ProjectProvider>
  </>)
}