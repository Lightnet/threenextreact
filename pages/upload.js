/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://gist.github.com/AshikNesin/e44b1950f6a24cfcd85330ffc1713513

import { useRef, useState, useEffect } from 'react';
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx) {

  return {
    props:{
      session: await getSession(ctx)//,
      //session: await getSession(),
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
    <form method="post" action="/api/upload" encType="multipart/form-data">
      <input name="file" type="file" />
      <button type="submit">Upload</button>
    </form> 
  </>);
}
/*
<form method="post" action="/api/upload" enctype="multipart/form-data">
*/