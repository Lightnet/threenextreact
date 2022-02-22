/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { EditorProvider } from "./context/EditorProvider.js";
import { ProjectProvider } from "./context/ProjectProvider.js";
import { ThreeProvider } from "./context/ThreeProvider.js";
import Editor from "./Editor.js";

export default function EditorPage({projectid}){

  return(<>
    <ProjectProvider>
      <EditorProvider>
        <ThreeProvider>
          <Editor projectid={projectid}></Editor>
        </ThreeProvider>
      </EditorProvider>
    </ProjectProvider>
  </>)
}