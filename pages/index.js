/*
  LICENSE: MIT
  Created by: Lightnet
*/

console.log("[[[=== Index Page ===]]]");
//import { useSession, signIn, signOut } from "next-auth/react";
// import { loadEnvConfig } from '@next/env'
import { useEffect } from 'react';
import { getSession } from "next-auth/react";
import SocketIOClient from "socket.io-client";
import SignArea from "../components/componentsignarea";

import { PrismaClient} from "@prisma/client";
//const prisma = new PrismaClient();
//import { prisma } from './database';

//export async function getStaticProps(ctx) {//client side
//export async function getServerSideProps(ctx) { //works need client not seruver
export async function getServerSideProps(ctx) {
  console.log("[[=== getServerSideProps ===]");
  return {
    props:{
      session: await getSession(ctx)
    }
  }
}

export default function IndexPage({session}) {
  console.log("[[[=== index page session ====]]]]");
  console.log(session);
  

  useEffect(async () => {//mount or load data
    //console.log("[[[=== loaded data...");

    if(!session){
      //session = await getSession();

      //let token = await getSession();
      //console.log("token");
      //console.log(token);
      //session = token;
    }

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

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
    
    //var clientsession = await getSession();//works
    //console.log(clientsession);
    
    console.log("index.js");
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  return (
    <>
      <div>
        <p>Welcome to Next.js!</p>
        <p>Work in progress!</p>
        <p>Threejs Fiber SQLite!</p>
      </div>
      <SignArea></SignArea>
    </>
  );
}