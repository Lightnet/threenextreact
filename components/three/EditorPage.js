/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { EditorProvider } from "./context/EditorProvider.js";
import { ThreeProvider } from "./context/ThreeProvider.js";
import Editor from "./Editor.js";

export default function EditorPage({editorid}){

  return(<>
    <EditorProvider>
      <ThreeProvider>
        <Editor editorid={editorid}></Editor>
      </ThreeProvider>
    </EditorProvider>
  </>)
}