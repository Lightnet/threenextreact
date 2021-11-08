/*
  LICENSE: MIT
  Created by: Lightnet
*/


// https://docs.pmnd.rs/react-three-fiber/API/hooks

//import { useEffect } from 'react';
//import React, { useRef, useState, useEffect } from 'react';
import { useRef, useState, useEffect } from 'react';
//import Router from 'next/router';
//import SocketIOClient from "socket.io-client";
//import prisma from './client';
//import { getSession } from "next-auth/react";
import { Canvas, useFrame, useThree,render, events } from '@react-three/fiber';

import Threejscanvas from "../../components/three/threejscanvas";

export async function getServerSideProps(ctx) {

  return {
    props:{
      //session: await getSession(ctx)//,
      //session: await getSession(),
    }
  }
}

export async function getInitialProps(ctx) {
  console.log("getInitialProps");
  console.log(ctx);
  //const initialProps = await Document.getInitialProps(ctx)
  return { 
    props:{

    } 
  };
}

export default function ThreePage({session}) {
  //const get = useThree((state) => state.get);

  /*
  if(window!=undefined){
    window.addEventListener('resize', () =>
      render(<mesh />, document.querySelector('canvas'), {
        events,
        size: { width: window.innerWidth, height: window.innerHeight },
      })
    )
    window.dispatchEvent(new Event('resize'))
  }
  */
  
  //const state = useThree();
  //const camera = useThree((state) => state.camera);
  //console.log(camera);

  useEffect(async () => {
    console.log("LOADED");
    console.log(window);
    //const state = useThree();

  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  return (<>
    <Threejscanvas>
    </Threejscanvas>  
  </>);
}

/*
  <Threejscanvas>
  </Threejscanvas>
*/