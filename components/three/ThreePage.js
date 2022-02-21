/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from "react";
import useFetch from "../hook/usefetch.js";
import Editor from "./EditorPage.js";
import GamesPage from "./GamesPage.js";
import ProjectsPage from "./ProjectsPage.js";

export default function ThreePage(){

  const [view, setView] = useState('default');//default, project ,editor, games
  const [editorID, setEditorID] = useState('');
  const [gameID, setGameID] = useState('');

  function onSelectView(name){
    setView(name);
  }

  async function clickFetchTest(){
    let data = await useFetch("/api")
    console.log(data);
  }

  function renderNav(){
    if(view=="default"){
      return (<div>
        <button onClick={()=>onSelectView("projects")}> Projects </button>
        <button onClick={()=>onSelectView("editor")}> Editor </button>
        <button onClick={()=>onSelectView("games")}> Games </button>
        <button onClick={clickFetchTest}> Fetch Test </button>
      </div>)
    }

    if(view=="projects"){
      return (<div>
        <button onClick={()=>onSelectView("default")}> Home </button>
        <button onClick={()=>onSelectView("editor")}> Editor </button>
        <button onClick={()=>onSelectView("games")}> Games </button>
      </div>)
    }

    if(view=="games"){
      return (<div>
        <button onClick={()=>onSelectView("default")}> Home </button>
        <button onClick={()=>onSelectView("projects")}> Projects </button>
        <button onClick={()=>onSelectView("editor")}> Editor </button>
      </div>)
    }
    return <></>
  }

  function onEditorID(event){
    console.log(event.target.value);
    //setEditorID()
  }

  function renderView(){
    if(view=="default"){
      return (<div>
        <p> Welcome to keep it simple. React three fiber build for editor and game. It all depend on the coding editor and game logic react javascript design.</p>
        <p> This is rework build for better logic code I hope. </p>
      </div>)
    }

    if(view=="projects"){return (<ProjectsPage/>)}
    if(view=="editor"){return (<Editor editorid={editorID} />)}
    if(view=="projects"){return (<GamesPage/>)}
    return <></>
  }

  return(<>
    {renderNav()}
    {renderView()}
  </>)
}