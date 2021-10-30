/*
  LICENSE: MIT
  Created by: Lightnet

  Note: this override the _app data set up
*/

// https://stackoverflow.com/questions/61184591/how-to-implement-loading-screen-in-next-js


//import Head from "next/head";
//import './styles.css';
//import { getSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { SessionProvider } from 'next-auth/react';
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
//import getConfig from 'next/config';
import "../styles/global.css";
import Loading from "../components/system/loading";

// Only holds serverRuntimeConfig and publicRuntimeConfig
//const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
//console.log(serverRuntimeConfig);
//console.log(publicRuntimeConfig);


export default function App({Component, pageProps}){
  console.log("[[[=== _app.js ===]]]");
  //console.log("session: ",session);

  const router = useRouter();
  //const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    console.log("APP INIT USEDEFFECT!");
    //testing loading
    /*
    setTimeout(() => {
      setLoading(false);
    }, 10000);
    */

    function load(event){
      console.log("page is fully loaded _app");
      setLoading(false);
    }
    //local works?
    window.addEventListener('load',load);

    //setLoading(true);
    const handleStart = (url) => {
      //url !== router.pathname ? setLoading(true) : setLoading(false);
      setLoading(true);
      console.log("loading:",loading);
    };
    const handleComplete = (url) =>{ 
      console.log("FINISH LOADING...");
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      window.removeEventListener('load',load);
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, []);
  
  return (    
    <SessionProvider 
      session={pageProps.session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      >
      {/*
        <Loading loading={loading} />
        <div>{loading ? "loading..." : "hello"}</div>;
      */}
      {loading && <Loading loading={loading} /> }

        <Component {...pageProps} />
    </SessionProvider>
  );
}

function Auth({ children }) {
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  React.useEffect(() => {
    if (status === "loading") return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log in
  }, [isUser, status])

  if (isUser) {
    return children
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>
}