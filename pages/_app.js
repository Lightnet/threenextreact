/*
  LICENSE: MIT
  Created by: Lightnet

  Note: this override the _app data set up
*/

// https://stackoverflow.com/questions/61184591/how-to-implement-loading-screen-in-next-js

import React, { useState, useEffect } from "react";
import { SessionProvider } from 'next-auth/react';
import { useRouter } from "next/router";
//import getConfig from 'next/config';
import "../styles/global.css";
//import './styles.css';
import Loading from "../components/system/loading";

// Only holds serverRuntimeConfig and publicRuntimeConfig
//const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
//console.log(serverRuntimeConfig);
//console.log(publicRuntimeConfig);

export default function App({Component, pageProps}){
  console.log("[[[=== _app.js ===]]]");
  //console.log("session: ",session);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //console.log("APP INIT USEDEFFECT!");
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
      //console.log("loading:",loading);
    };
    const handleComplete = (url) =>{ 
      //console.log("FINISH LOADING...");
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    }
  }, [loading,router]);

  function isRenderLoading(){
    if(loading){
      //console.log("render loading:",loading);
      //return (<div>Loading...</div>);
      return <Loading></Loading>;
    }
    return (<></>);
  }
  
  return (    
    <SessionProvider 
      session={pageProps.session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      >
      {isRenderLoading()}
      <Component {...pageProps} />
    </SessionProvider>
  );
}