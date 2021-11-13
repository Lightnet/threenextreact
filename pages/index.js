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
import ProjectList from "../components/editor/projectlist";
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
  console.log("[[[=== INDEX PAGE ====]]]]");
  //console.log(session);

  const [sideBarLeft, setSideBarLeft] = useState(false);
  const [sideBarRight, setSideBarRight] = useState(false);
  const [sideBarTop, setSideBarTop] = useState(false);
  const [sideBarBottom, setSideBarBottom] = useState(false);

  const [selectSection, setselectSection] = useState("");

  const [panel, setPanel] = useState(<></>);


  useEffect(async () => {//mount or load data
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

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
    }else if(selectSection == "projectlist"){
      return(<ProjectList></ProjectList>);
    }else{
      return(<div></div>);
    }
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
      <button onClick={(e)=> sideBarLeftToggle()}>☰ Open Sidebar</button> 
      <button onClick={(e)=> sideBarTopToggle()}>☰ Open Top Sidebar</button> 
      <button onClick={(e)=> sideBarBottomToggle()}>☰ Open Bottom Sidebar</button> 
      {/*  */}
      <div>
        <p>Welcome to Next.js for threejs and other packages to build threejs development builds!</p>
        <p>Work in progress!</p>
      </div>
      <a href="#" onClick={(e)=>selSection(e,"three")}>Three</a>
      <span> | </span>
      <a href="#" onClick={(e)=>selSection(e,"projectlist")}>Editor List</a>
      <span> | </span> 
      <a href="#" onClick={(e)=>selSection(e,"gamelist")}>Game List</a>
      <span> | </span> 
      <a href="#" onClick={(e)=>selSection(e,"docs")}>Docs</a>
      <br />

      {renderSection()}
      

      <Link href="/threejs">Page Threejs</Link>
      <br/>
      <Link href="/editor">Page Editor</Link>
      <br/>
      <Link href="/game">Page Game</Link>
      <br/>
      <SignArea></SignArea>
    </>
  );
}