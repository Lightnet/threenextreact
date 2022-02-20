/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js
*/

import "../styles/global.css";
import React, { useState, useEffect } from "react";

import NotifyManager from "./notify/notifymanager";
import { NotifyProvider } from "./notify/notifyprovider";
import { ThemeProvider } from "./theme/themeprovider";
import IndexPage from "./indexpage";

export default function App(props){
  console.log("props:", props);
  return (<>

    <ThemeProvider>
      <NotifyProvider>
        <IndexPage  />        
        <NotifyManager />
      </NotifyProvider>
    </ThemeProvider>
  </>);
}
/*

*/