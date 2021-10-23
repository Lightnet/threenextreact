

// https://next-auth.js.org/getting-started/client
// https://nextjs.org/docs/basic-features/built-in-css-support
import Head from "next/head";
import { SessionProvider } from 'next-auth/react';
import "../styles/global.css";

//import { SessionProvider } from "next-auth/react";
//import { getSession } from "next-auth/react";

//import './styles.css';
//import React, { LayoutComponent } from "react";

// note: this override the _app data set up

// https://nextjs.org/docs/advanced-features/custom-app


export default function App({
  Component, 
  pageProps:{ session, ...pageProps }
}){
  //await getSession();
  console.log("_app server data");
  console.log("session: ",session);
  
  return (
  <>
    <SessionProvider 
      session={session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      >
      <Component {...pageProps} />
    </SessionProvider>
  </>
  );
}

/*

    <Provider
      session={pageProps.session} >
      <Head>
      </Head>
       <Component {...pageProps} />
    </Provider>

        <script
          src="/socket.io/socket.io.js"
          type="text/javascript"
          strategy="beforeInteractive" // lazyOnload, afterInteractive
        ></script>
*/