/*
  LICENSE: MIT
  Created by: Lightnet
*/

//console.log("[[[=== Index Page ===]]]");
//import { useSession, signIn, signOut } from "next-auth/react";
// import { loadEnvConfig } from '@next/env';
import { useEffect } from 'react';
import { getSession } from "next-auth/react";
import SocketIOClient from "socket.io-client";
import SignArea from "../components/componentsignarea";

import DBTest from "../components/componentdbtest";
import Sidebar from "../components/componentsidebarleft";

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
      session: await getSession(ctx)
    }
  }
}

export default function IndexPage({session}) {
  console.log("[[[=== INDEX PAGE ====]]]]");
  console.log(session);

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

  return (
    <>
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