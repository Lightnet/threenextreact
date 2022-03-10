/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js

*/

import React from "react";
import { useAuth } from "./auth/auth";
import Sign from "./auth/sign";
export default function IndexPage(){

  const { user } = useAuth();

  if(!user){
    return <>
    <Sign/><br/>
    </>
  }

  return (<>
    <label> Home </label>
  </>)
}