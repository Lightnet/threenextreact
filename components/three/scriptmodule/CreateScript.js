/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useState } from "react";

export default function CreateScript(){

  console.log()

  const [scriptName, setScriptName] = useState("None");
  const [scripText, setScriptText] = useState('console.log("Hello world script")');

  function clickAddScript(){
    let id = document.getElementById(scriptName);
    if(id){
      //console.log(id);
      id.remove()
      //document.getElementById(scriptName).innerText = 'console.log("Hello world script2")';
      id = document.createElement("script");
      id.setAttribute("id", scriptName);
      id.setAttribute("type", "module");
      id.innerText = 'console.log("Hello world script2")';
      document.body.append(id);
    }else{
      id = document.createElement("script");
      id.setAttribute("id", scriptName);
      id.setAttribute("type", "module");
      id.innerText = scripText;
      document.body.append(id);
    }
  }

  return <>
    <button onClick={clickAddScript}> Test </button>

  </>
}