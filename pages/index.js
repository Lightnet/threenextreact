/*
  LICENSE: MIT
  Created by: Lightnet
*/

//console.log("[[[=== Index Page ===]]]");
//import { useSession, signIn, signOut } from "next-auth/react";
// import { loadEnvConfig } from '@next/env';
import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import Link from 'next/link';

import SignArea from "../components/system/signarea";

import SidebarLeft from "../components/layout/sidebarleft";
import SidebarBottom from "../components/layout/sidebarbottom";
import SidebarTop from "../components/layout/sidebartop";
import SideBarRight from "../components/layout/sidebarright";
import GameList from "../components/game/gamesection";

import EditorProjects from "../components/editor/project/projects";


export async function getServerSideProps(ctx) {
  console.log("[[=== INDEX getServerSideProps ===]");
  //console.log(ctx);
  return {
    props:{
      session: await getSession(ctx)
    }
  }
}

export default function IndexPage({
  session
}) {
  //console.log("[[[=== INDEX PAGE ====]]]]");
  //console.log(session);

  const [sideBarLeft, setSideBarLeft] = useState(false);
  const [sideBarRight, setSideBarRight] = useState(false);
  const [sideBarTop, setSideBarTop] = useState(false);
  const [sideBarBottom, setSideBarBottom] = useState(false);

  const [selectSection, setselectSection] = useState("editorprojects");

  const [panel, setPanel] = useState(<></>);


  useEffect(async () => {//mount or load data
    //console.log(session);
  }, [session]) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  function sideBarLeftToggle(){
    //console.log("seteditorTSB");
    setSideBarLeft(!sideBarLeft);
  }

  function sideBarTopToggle(){
    //console.log("seteditorTSB");
    setSideBarTop(!sideBarTop);
  }

  function sideBarBottomToggle(){
    //console.log("seteditorTSB");
    setSideBarBottom(!sideBarBottom);
  }

  function sideBarRightToggle(){
    //console.log("seteditorTSR");
    setSideBarRight(!sideBarRight);
  }

  function selSection(event, id){
    event.preventDefault();
    setselectSection(id);
  }

  function renderSection(){
    if(selectSection == "gamelist"){
      return(<GameList></GameList>);
    }else if(selectSection == "editorprojects"){
      return(<EditorProjects></EditorProjects>);
    }else if(selectSection == "three"){
      return(<>
        <div>
        <label>Examples:</label>
        <br />
        <a href="/examples/threejs"> three.js fiber </a>
        <br />
        <a href="/examples/threejscannon"> three.js fiber cannon </a>
        </div>
      </>);
    }else{
      return(<div></div>);
    }
  }

  if ((!session)) {//if there no sesson then render here basic login page.
    return(<>
      <SignArea></SignArea>
      <p>Next.js and Three.js development builds!</p>
      <p>Work in progress!</p>
    </>)
  }

  return (
    <>
      <SidebarLeft
        isOpen={sideBarLeft}
        onRequestClose={sideBarLeftToggle}
      >
        <a href="/about">About</a>
        <a href="/threejs">Threejs</a>
      </SidebarLeft>

      <SidebarTop
        isOpen={sideBarTop}
        onRequestClose={sideBarTopToggle}
      >
        <a href="#">Messages</a>
        <a href="#">Editor</a>
        <a href="#">Game</a>
        <a href="#">Server</a>
      </SidebarTop>

      <SidebarBottom
        isOpen={sideBarBottom}
        onRequestClose={sideBarBottomToggle}
      >
        <a href="/about">About</a>
        <a href="/threejs">Threejs</a>
        <a href="#">Test</a>
      </SidebarBottom>
      {/* js comment  */}
      <SideBarRight
        isOpen={sideBarRight}
        onRequestClose={sideBarRightToggle}
      >
        <a href="#" >Right</a>
      </SideBarRight>

      
      <button onClick={(e)=> sideBarLeftToggle()}>Open Sidebar</button> 
      <button onClick={(e)=> sideBarTopToggle()}> Open Top Sidebar</button> 
      <button onClick={(e)=> sideBarBottomToggle()}> Open Bottom Sidebar</button> 
      <button onClick={(e)=> sideBarRightToggle()}> Open Right Sidebar</button> 
      {/*
      */}

      {/*  */}
      <div>
        <SignArea></SignArea>
      </div>
      <a href="#" onClick={(e)=>selSection(e,"three")}>Three.js</a>
      <span> | </span>
      <a href="#" onClick={(e)=>selSection(e,"editorprojects")}>Editor Projects</a>
      <span> | </span> 
      <a href="#" onClick={(e)=>selSection(e,"gamelist")}>Game List</a>
      <span> | </span> 
      <a href="#" onClick={(e)=>selSection(e,"docs")}>Docs</a>
      <br />

      {renderSection()}
      
      <Link href="/threejs">Page Threejs</Link>
      <span> | </span>
      <Link href="/editor">Page Editor</Link>
      <span> | </span>
      <Link href="/game">Page Game</Link>
      <span> | </span>
      

      <p>Next.js and Three.js development builds!</p>
      <p>Work in progress!</p>
    </>
  );
}