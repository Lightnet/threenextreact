/*
  LICENSE: MIT
  Created by: Lightnet
*/


// https://docs.pmnd.rs/react-three-fiber/API/hooks
// https://dmitripavlutin.com/react-useref-guide/

//import { useEffect } from 'react';
//import React, { useRef, useState, useEffect } from 'react';

//import { getSession } from "next-auth/react";

//import Threejscanvas from "../components/threejscanvas";

import { useRef, useState, useEffect } from 'react';
//import { Canvas, useFrame, useThree,render, events } from '@react-three/fiber';
//import { Physics,usePlane, useBox } from '@react-three/cannon';

import Draggable from "../components/ui/edragwindow";

/*
export async function getServerSideProps(ctx) {

  return {
    props:{
    }
  }
}
*/
/*
export async function getInitialProps(ctx) {
  console.log("getInitialProps");
  console.log(ctx);
  //const initialProps = await Document.getInitialProps(ctx)
  return { 
    props:{

    } 
  };
}
*/

export default function Page(props) {
  const countRef = useRef(0);

  useEffect(async () => {
    console.log("LOADED");
    //const state = useThree();

  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  const handle = () => {
    countRef.current++;
    console.log(`Clicked ${countRef.current} times`);
  };

  console.log('I rendered!');

  return (<>

    <button onClick={handle}>Click me</button>
    <Draggable>      
    </Draggable>
  </>);
}
/*

    {()=>{//not to used this... error on compoent
      if(true){
      return (<button>Hi</button>);
      }
    }}


*/