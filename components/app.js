/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js
*/

import "../styles/global.css";
import React from "react";

import NotifyManager from "./notify/notifymanager";
import { NotifyProvider } from "./notify/notifyprovider";
import { ThemeProvider } from "./theme/themeprovider";
import RoutePage from "./RoutePage";
import { AuthProvider } from "./auth/auth";
import { BrowserRouter } from "react-router-dom";

export default function App(props){
  //console.log("props:", props);

  return (<>
    <ThemeProvider>
      <NotifyProvider>
        <BrowserRouter>
          <AuthProvider>
            <RoutePage  />        
            <NotifyManager />
          </AuthProvider>
        </BrowserRouter>
      </NotifyProvider>
    </ThemeProvider>
  </>);
}
/*

*/