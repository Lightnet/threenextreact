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
  //, matchPath
  //, useParams 
} from "react-router-dom";

export default function NavAccess(){
  //const location = useLocation();
  const { pathname } = useLocation();
  //const params = useParams();
  //console.log(location)
  //console.log(pathname)
  //useEffect(()=>{
    //console.log(params);
  //},[params])

  if(pathname=="/editor"){
    return <></>
  }

  return <div>
    <Sign/>
  </div>
}