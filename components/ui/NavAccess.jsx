/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js

*/

// https://stackoverflow.com/questions/66265608/react-router-v6-get-path-pattern-for-current-route

import React, { useEffect } from "react";
import Sign from "../auth/Sign";

import {
    useLocation
} from "react-router-dom";
import ThemeLink from "../theme/ThemeLink";

export default function NavAccess(){
  
  const { pathname } = useLocation();

  if(pathname=="/editor"){
    return <></>
  }

  return <div>
    <Sign/><span> | </span><ThemeLink/>
  </div>
}