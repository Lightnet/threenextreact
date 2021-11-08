/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useRef, useState, useEffect } from 'react';
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx) {

  return {
    props:{
      session: await getSession(ctx)//,
    }
  }
}

export default function Page({session}) {

  useEffect(async () => {
    console.log("LOADED");
    console.log(window);
    //const state = useThree();

  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted


  return (<>
  </>);
}