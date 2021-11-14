/*
  LICENSE: MIT
  Created by: Lightnet
*/

//console.log("[[[=== Index Page ===]]]");
//import { useSession, signIn, signOut } from "next-auth/react";
// import { loadEnvConfig } from '@next/env';
import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import SignArea from "../components/system/signarea";
import SidebarLeft from "../components/layout/sidebarleft";
import SidebarBottom from "../components/layout/sidebarbottom";
import SidebarTop from "../components/layout/sidebartop";
import GameList from "../components/game/gamelist";
import EditorProjects from "../components/editor/editorprojects";
import Link from 'next/link';

export async function getServerSideProps(ctx) {
  console.log("[[=== INDEX getServerSideProps ===]");
  //console.log(users);
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

  const [selectSection, setselectSection] = useState("");

  const [panel, setPanel] = useState(<></>);


  useEffect(async () => {//mount or load data
    console.log(session)
  }, [session]) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  function sideBarLeftToggle(){
    console.log("seteditorTSB");
    setSideBarLeft(!sideBarLeft);
  }

  function sideBarTopToggle(){
    console.log("seteditorTSB");
    setSideBarTop(!sideBarTop);
  }

  function sideBarBottomToggle(){
    console.log("seteditorTSB");
    setSideBarBottom(!sideBarBottom);
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
      ></SidebarLeft>

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
      </SidebarBottom>
      {/* js comment  */}

      {/* 
      <button onClick={(e)=> sideBarLeftToggle()}>Open Sidebar</button> 
      <button onClick={(e)=> sideBarTopToggle()}> Open Top Sidebar</button> 
      <button onClick={(e)=> sideBarBottomToggle()}> Open Bottom Sidebar</button> 
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