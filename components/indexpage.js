/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js
*/
import React from "react";
import { EditorProvider } from "./editor/context/editorprovider";
import EditorSection from "./editor/editorsection";

export default function IndexPage(){

  return (<>
    <EditorProvider>
      <EditorSection />    
    </EditorProvider>
  </>)
}
/*

*/