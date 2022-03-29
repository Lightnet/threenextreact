/*
  LICENSE: MIT
  Created by: Lightnet

  Note: for express js

*/

// https://www.codingdeft.com/posts/react-router-tutorial/

import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import Sign from "./auth/Sign";
import { SignInPage } from "./auth/SignInPage";
import { SignOutPage } from "./auth/SignOutPage";
import { SignUpPage } from "./auth/SignUpPage";
import ErrorPage from "./system/ErrorPage";
import EditorPage from "./three/EditorPage";
import GamePage from "./three/GamePage";
import GamesPage from "./three/GamesPage";
import ProjectsPage from "./three/ProjectsPage";
//import ThreePage from "./three/ThreePage";
import NavAccess from "./ui/NavAccess";
import HomePage from "./pages/HomePage";

export default function RoutePage(){

  const { user } = useAuth();
  // need to fix this error on copy page url
  if(!user){
    return <>
    <Sign/><br/>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signout" element={<SignOutPage />} />
      <Route path="editor/*" element={<EditorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    </>
  }

  return (<>
    <NavAccess/>
    <Routes>
      <Route index element={<ProjectsPage />} />
      <Route path="projects/*" element={<ProjectsPage />} />
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