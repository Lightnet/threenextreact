/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import Link from 'next/link';
import SignArea from "../components/system/signarea";
import Projects from '../components/three/Projects';

export async function getServerSideProps(ctx) {
  console.log("[[=== INDEX getServerSideProps ===]");
  //console.log(ctx);
  return {
    props:{
      session: await getSession(ctx)
    }
  }
}

export default function IndexPage({
  session
}) {

  const [selectType, setselectType] = useState("projects");

  function selSection(event, id){
    event.preventDefault();
    setselectType(id);
  }

  function renderSection(){
    if(selectType == "gamelist"){
      //return(<GameList></GameList>);
    }else if(selectType == "projects"){
      return(<Projects/>);
    }else{
      return(<div></div>);
    }
  }

  if ((!session)) {//if there no sesson then render here basic login page.
    return(<>
      <SignArea></SignArea>
      <p>Next.js and Three.js development builds!</p>
      <p>Work in progress!</p>
    </>)
  }

  return (
    <>
      <div>
        <SignArea></SignArea>
      </div>
      <a href="#" onClick={(e)=>selSection(e,"projects")}>Projects</a> <span> | </span>
      <Link href="/editor">Editor</Link><span> | </span>
      <Link href="/games">Games</Link><span> | </span>
      {renderSection()}
      
      
      <br/>
      <p>Next.js and Three.js development builds!</p>
      <p>Work in progress!</p>
    </>
  );
}