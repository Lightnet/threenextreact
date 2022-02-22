/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js

*/

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/auth";
import Sign from "./auth/sign";
import { SignInPage } from "./auth/signin";
import { SignOutPage } from "./auth/signout";
import { SignUpPage } from "./auth/signup";
import ErrorPage from "./system/errorpage";
import EditorPage from "./three/EditorPage";
import ThreePage from "./three/ThreePage";

export default function IndexPage(){

  const { user } = useAuth();

  if(!user){
    return <>
    <Sign></Sign><br/>
    <Routes>
      <Route path="/" element={<ThreePage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signout" element={<SignOutPage />} />
      <Route path="editor" element={<EditorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>
  }

  return (<>
    <Routes>
      <Route path="/" element={<ThreePage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signout" element={<SignOutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </>)
}
/*

*/