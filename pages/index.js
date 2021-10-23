console.log("server side render");

//import Head from 'next/head';
//import Script from 'next/script';
//import { getSession } from "next-auth/react";
//import { PrismaClient} from "@prisma/client";
//const prisma = new PrismaClient();
// import { loadEnvConfig } from '@next/env'

import { useEffect } from 'react';
import { getSession } from "next-auth/react";
//import { useSession, signIn, signOut } from "next-auth/react";
import SocketIOClient from "socket.io-client";
import prisma from './client';

import LoginArea from "../components/LoginArea";

// https://nextjs.org/docs/basic-features/environment-variables
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
// https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
// https://next-auth.js.org/getting-started/client#sessionprovider
//export async function getStaticProps(ctx) {
//export async function getServerSideProps(ctx) { //works need client not seruver
export async function getServerSideProps(ctx) {
  console.log("getStaticProps");
  let contacts = await prisma.contact.findMany();

  return {
    props:{
      session: await getSession(ctx),
      //session: await getSession(),
      initialContacts:contacts
    }
  }
}

// https://github.com/nextauthjs/next-auth/issues/1130
// https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
// https://nextjs.org/blog/forms
// https://stackoverflow.com/questions/68941527/nextjs-next-auth-getsession-in-getserversideprops-with-https-not-work
export default function IndexPage({session,initialContacts}) {
  console.log("session index]]]]");
  console.log(session);
  //console.log(initialContacts);
  //const { data: session, status } = useSession();

  //var {status }= useSession();

  useEffect(async () => {
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
      //chat.push(message);
      //setChat([...chat]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
    
    var clientsession = await getSession();//works
    console.log(clientsession);
    
    //console.log("status:",status);
    //console.log("[[ status ]]")
    //console.log(status );
    //if (status === "loading") return ;// Do nothing while loading

    /*
    fetch('/api/socketio').finally(() => {
      const socket = io()
      socket.on('connect', () => {
        console.log('connect')
        socket.emit('hello')
      })
      socket.on('hello', data => {
        console.log('hello', data)
      })
      socket.on('a user connected', () => {
        console.log('a user connected')
      })
      socket.on('disconnect', () => {
        console.log('disconnect')
      })
    });
    */
    console.log("index.js");
    //fetch('/api/user').finally(() => {
    //})
    //console.log(session);
    //console.log(initialContacts);

  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  async function handleSubmit(event) {
    event.preventDefault();
    //alert('A name was submitted: ' + this.state.value);
    console.log("test");

    console.log(event.target.firstname.value);
    console.log(event.target.lastname.value);
    console.log(event.target.email.value);

    const res = await fetch('/api/contact',{
      method: 'POST',
      //headers: {
        //'Content-Type': 'application/json'
      //},
      body: JSON.stringify({
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        email: event.target.email.value
      })
    });
    const result = await res.json();
    // result.user => 'Ada Lovelace'
    console.log(result);
    
  }

  return (
    <>
      <div>Welcome to Next.js!</div>
      <br/>
      <label> Add contact: </label>
      <form onSubmit={handleSubmit}>
        <label> First Name: </label> <input id="firstname" name="firstname"></input>
        <br/>
        <label> Last Name: </label><input name="lastname"></input>
        <br/>
        <label> Email: </label><input name="email"></input>
        <br/>
        <button type="submit">Register</button>
      </form>
      <br />
      <LoginArea></LoginArea>
    </>
  );
}

//export default IndexPage
/*

<div>
      <div>Welcome to Next.js!</div>
    </div>

    <head>
      <Script 
        src="/socket.io/socket.io.js"
        strategy="beforeInteractive" // lazyOnload, afterInteractive
        onLoad={() => {
          console.log("Loaded");
          // If loaded successfully, then you can load other scripts in sequence
        }}
      />
    </head>
*/