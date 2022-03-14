/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js
*/

import "../styles/global.css";
import React from "react";

import NotifyManager from "./notify/NotifyManager";
import { NotifyProvider } from "./notify/NotifyProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import RoutePage from "./RoutePage";
import { AuthProvider } from "./auth/AuthProvider";
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