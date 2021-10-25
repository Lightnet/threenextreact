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

import DBTest from "../components/componentdbtest";
import SidebarL from "../components/componentleftsidebar";


import SidebarB from "../components/componentbottomsidebar";

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

  const [_LSBwidth, _setLSBWidth] = useState(0);
  const [_BSHeight, _setBSBHeight] = useState(0);
  const [_RSBwidth, _setRSBWidth] = useState(0);

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

  const openLSB = (event)=> {
    event.preventDefault();
    console.log("open sidebar?");
    if(_LSBwidth==0){
      _setLSBWidth(200);
    }else{
      _setLSBWidth(0);
    }
  }

  function LSBClose(){
    _setLSBWidth(0);
  }

  const openBSB = (event)=> {
    event.preventDefault();
    console.log("open sidebar?");
    if(_BSHeight==0){
      _setBSBHeight(32);
    }else{
      _setBSBHeight(0);
    }
  }

  function BSBClose(){
    _setBSBHeight(0);
  }

  return (
    <>
      <SidebarL
        SB_Width={_LSBwidth}
        SBClose={LSBClose}
      ></SidebarL>
      <SidebarB
        SB_Height={_BSHeight}
        SBClose={BSBClose}
      >
      </SidebarB>
      <button className="openbtn" onClick={(e)=> openLSB(e,"open")}>☰ Open Sidebar</button> 

      <button className="openbtn" onClick={(e)=> openBSB(e,"open")}>☰ Open Bottom Sidebar</button> 

      <div>
        <p>Welcome to Next.js!</p>
        <p>Work in progress!</p>
        <p>Threejs Fiber SQLite!</p>
      </div>
      <DBTest></DBTest>
      <SignArea></SignArea>
    </>
  );
}

/*
<Btnchild childToParent={childToParent}></Btnchild>

*/