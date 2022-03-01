/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js

*/

// https://stackoverflow.com/questions/66265608/react-router-v6-get-path-pattern-for-current-route

import React, { useEffect } from "react";
import Sign from "../auth/sign";

import {
    useLocation
} from "react-router-dom";

export default function NavAccess(){
  
  const { pathname } = useLocation();

  if(pathname=="/editor"){
    return <></>
  }

  return <div>
    <Sign/>
  </div>
}