/*
  LICENSE: MIT
  Created by: Lightnet

  Note: this override the _app data set up
*/

//import Head from "next/head";
//import './styles.css';
//import { getSession } from "next-auth/react";
import React from "react";
import { SessionProvider } from 'next-auth/react';
import "../styles/global.css";

export default function App({Component, pageProps}){
  //await getSession();
  console.log("[[[=== _app.js ===]]]");
  //console.log("session: ",session);
  
  return (
    <SessionProvider 
      session={pageProps.session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      >
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