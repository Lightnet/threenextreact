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
import SignArea from "../components/componentsignarea";

//import DBTest from "../components/componentdbtest";
import SidebarLeft from "../components/componentleftsidebar";
import SidebarBottom from "../components/componentbottomsidebar";
import SidebarTop from "../components/componenttopsidebar";

//import Btnchild from "../components/componentbtnchild";

import { PrismaClient } from '@prisma/client';
import {clientDB} from "./db";


//export async function getStaticProps(ctx) {// client side
//export async function getServerSideProps(ctx) { // server
export async function getServerSideProps(ctx) {
  console.log("[[=== getServerSideProps ===]");
  let prisma = clientDB(PrismaClient);
  const users = await prisma.user.findMany();
  console.log(users);

  return {
    props:{
      session: await getSession(ctx),
      LSideBar_Width:0
    }
  }
}

export default function IndexPage({
  session
  , LSideBar_Width

}) {
  console.log("[[[=== INDEX PAGE ====]]]]");
  console.log(session);

  const [sideBarLeft, setSideBarLeft] = useState(false);
  const [sideBarRight, setSideBarRight] = useState(false);
  const [sideBarTop, setSideBarTop] = useState(false);
  const [sideBarBottom, setSideBarBottom] = useState(false);

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

    console.log("index.js");
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

      <button onClick={(e)=> sideBarLeftToggle()}>☰ Open Sidebar</button> 
      <button onClick={(e)=> sideBarTopToggle()}>☰ Open Top Sidebar</button> 
      <button onClick={(e)=> sideBarBottomToggle()}>☰ Open Bottom Sidebar</button> 

      <div>
        <p>Welcome to Next.js!</p>
        <p>Work in progress!</p>
        <p>Threejs Fiber SQLite!</p>
      </div>
      <a href="/threejs">Threejs</a>
      <br/>
      <a href="/editor">Editor</a>
      <br/>
      <a href="/game">Game</a>
      <br/>
      <SignArea></SignArea>
    </>
  );
}

/*
<Btnchild childToParent={childToParent}></Btnchild>
<button className="openbtn" onClick={(e)=> sideBarLeftToggle()}>☰ Open Sidebar</button> 
*/