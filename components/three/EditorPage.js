/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { EditorProvider } from "./context/EditorProvider.js";
import { ProjectProvider } from "./context/ProjectProvider.js";
import { EntityProvider } from "./context/EntityProvider.js";
import Editor from "./Editor.js";

export default function EditorPage({projectid}){

  return(<>
    <ProjectProvider>
      <EditorProvider>
        <EntityProvider>
          <Editor projectid={projectid}></Editor>
        </EntityProvider>
      </EditorProvider>
    </ProjectProvider>
  </>)
}