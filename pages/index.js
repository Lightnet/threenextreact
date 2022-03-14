/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { getSession } from "next-auth/react";
import Link from 'next/link';
import SignArea from "../components/system/signarea";
import Projects from '../components/three/Projects';
import { log } from '../lib/log.mjs';

export async function getServerSideProps(ctx) {
  log("[[=== INDEX getServerSideProps ===]");
  //log(ctx);
  return {
    props:{
      session: await getSession(ctx)
    }
  }
}

export default function IndexPage({
  session
}) {

  if ((!session)) {//if there no sesson then render here basic login page.
    return(<>
      <SignArea/>
      <p>Next.js and Three.js development builds!</p>
      <p>Work in progress!</p>
    </>)
  }

  return (
    <>
      <div>
        <SignArea></SignArea>
      </div>
      <Projects/>
    </>
  );
}