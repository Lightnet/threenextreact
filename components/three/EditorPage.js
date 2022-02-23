/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://ultimatecourses.com/blog/query-strings-search-params-react-router

import React, { useEffect, useState } from "react";
import { EditorProvider } from "./context/EditorProvider.js";
import { ProjectProvider } from "./context/ProjectProvider.js";
import { EntityProvider } from "./context/EntityProvider.js";
import Editor from "./Editor.js";
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
      console.log("props.projectid NULL!")
    }
    const currentParams = Object.fromEntries([...searchParams]);
    //console.log(currentParams);
    if(currentParams?.projectid){
      setProjectID(currentParams.projectid)
    }
  },[projectid])

  //if(isEmpty(projectID)){
    //return <label> Project ID NULL </label>
  //}

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