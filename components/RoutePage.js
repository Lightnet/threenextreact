/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js

*/

// https://www.codingdeft.com/posts/react-router-tutorial/

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/auth";
import Sign from "./auth/sign";
import { SignInPage } from "./auth/signin";
import { SignOutPage } from "./auth/signout";
import { SignUpPage } from "./auth/signup";
import ErrorPage from "./system/errorpage";
import EditorPage from "./three/EditorPage";
import GamePage from "./three/GamePage";
import GamesPage from "./three/GamesPage";
import ProjectsPage from "./three/ProjectsPage";
import ThreePage from "./three/ThreePage";
import NavAccess from "./ui/NavAccess";

export default function RoutePage(){

  const { user } = useAuth();
  // need to fix this error on copy page url
  if(!user){
    return <>
    <Sign/><br/>
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signout" element={<SignOutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>
  }

  return (<>
    <NavAccess/>
    <Routes>
      <Route path="/" element={<ProjectsPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="editor/*" element={<EditorPage />} />
      <Route path="games" element={<GamesPage />} />
      <Route path="game/*" element={<GamePage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signout" element={<SignOutPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </>)
}
/*

*/