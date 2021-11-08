/*
  LICENSE: MIT
  Created by: Lightnet
*/


// https://docs.pmnd.rs/react-three-fiber/API/hooks

//import { useEffect } from 'react';
//import React, { useRef, useState, useEffect } from 'react';
//import { getSession } from "next-auth/react";
//import Threejscanvas from "../components/threejscanvas";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree,render, events } from '@react-three/fiber';
import { Physics,usePlane, useBox } from '@react-three/cannon'

export async function getServerSideProps(ctx) {

  return {
    props:{
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

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[100, 100]} />
    </mesh>
  )
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  return (
    <mesh ref={ref}>
      <boxBufferGeometry />
    </mesh>
  )
}

function MyComponent() {
  const { name, aNumber } = useControls({ name: "World", aNumber: 0 })
  
  return <div>Hey {name}, hello! {aNumber}</div>
}

export default function Page({session}) {
  //const get = useThree((state) => state.get);
  //const state = useThree();
  //const camera = useThree((state) => state.camera);
  //console.log(camera);

  useEffect(async () => {
    console.log("LOADED");
    console.log(window);
    //const state = useThree();

  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  return (<>
    <Canvas>
      <Physics>
        <Plane />
        <Cube />
      </Physics>
    </Canvas>
  </>);
}
