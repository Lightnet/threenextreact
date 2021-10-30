/*
  LICENSE: MIT
  Created by: Lightnet
*/

//console.log("[[[=== Index Page ===]]]");
//import { useSession, signIn, signOut } from "next-auth/react";
// import { loadEnvConfig } from '@next/env';
import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import SocketIOClient from "socket.io-client";
import SignArea from "../components/system/signarea";

//import DBTest from "../components/componentdbtest";
//import Btnchild from "../components/componentbtnchild";
import SidebarLeft from "../components/layout/sidebarleft";
import SidebarBottom from "../components/layout/sidebarbottom";
import SidebarTop from "../components/layout/sidebartop";

import GameList from "../components/game/gamelist";
import ProjectList from "../components/editor/projectlist";

import { PrismaClient } from '@prisma/client';
import {clientDB} from "./db";


//export async function getStaticProps(ctx) {// client side
//export async function getServerSideProps(ctx) { // server
export async function getServerSideProps(ctx) {
  console.log("[[=== INDEX getServerSideProps ===]");
  let prisma = clientDB(PrismaClient);
  const users = await prisma.user.findMany();
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
    //console.log("[[[=== loaded data...");
    // connect to socket server
    const socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socketio",
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      //setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message) => {
      console.log(message);
      //chat.push(message);
      //setChat([...chat]);
    });

    //console.log("index.js");
    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  function sideBarLeftToggle(){
    console.log("seteditorTSB");
    if(sideBarLeft){
      setSideBarLeft(false);
    }else{
      setSideBarLeft(true);
    }
  }

  function sideBarTopToggle(){
    console.log("seteditorTSB");
    if(sideBarTop){
      setSideBarTop(false);
    }else{
      setSideBarTop(true);
    }
  }

  function sideBarBottomToggle(){
    console.log("seteditorTSB");
    if(sideBarBottom){
      setSideBarBottom(false);
    }else{
      setSideBarBottom(true);
    }
  }

  function selSection(event, id){
    event.preventDefault();
    setselectSection(id);
  }

  useEffect(async () => { 

  }, []);

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
        <a href="#">Add Light</a>
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
        <p>Welcome to Next.js!</p>
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
      

      <a href="/threejs">Page Threejs</a>
      <br/>
      <a href="/editor">Page Editor</a>
      <br/>
      <a href="/game">Page Game</a>
      <br/>
      <SignArea></SignArea>
    </>
  );
}

/*
<Btnchild childToParent={childToParent}></Btnchild>
<button className="openbtn" onClick={(e)=> sideBarLeftToggle()}>☰ Open Sidebar</button> 
*/