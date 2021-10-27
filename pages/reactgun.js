/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://dabit3.hashnode.dev/how-to-build-a-decentralized-peer-to-peer-network-in-javascript-ckkwl6jnk00ysxps10o94gyzg


import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
//import { useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import GUN from "https://cdn.skypack.dev/gun";
import GUN from "gun/gun"; //browser client, error package
//import GUN from "gun"; //

export async function getServerSideProps(ctx) {
  return {
    props:{
      session: await getSession(ctx),
    }
  }
}

export default function Page({
  session
}){
  const [gun, setGun] = useState(null);
  const [inputValue, setInputValue] = useState("test");
  
  //const gun = GUN({
      //raddisk:false
    //, peers: [
      //'http://localhost:3000/gun'
      //'http://localhost:3000/api/gun' //nope, need work
    //]
  //})

  async function initGun(){
    if(!gun){
      //init gun server
      const response = await fetch('/api/gun');
      console.log(response);
      if(response.ok){
        console.log("gun database init...");
      }

      let _gun = GUN({
        raddisk:false
        , peers: [
        'http://localhost:3000/gun'
        //'http://localhost:3000/api/gun' //nope, need work
      ]
      })
      
      _gun.on('hi', peer => {//peer connect
        //console.log('connect peer to',peer);
        console.log('peer connect!');
      });
      
      _gun.on('bye', (peer)=>{// peer disconnect
        //console.log('disconnected from', peer);
        console.log('disconnected from peer!');
      });
      
      setGun(_gun);
    }
  }
  

  useEffect(async () => {//mount or load data
    initGun();
  }, [gun]) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  
  function setValue(){
    gun.get('keyv').put({inputValue:inputValue},(ack)=>{
      console.log(ack)
    })
  }

  function getValue(){
    gun.get('keyv').get('inputValue').once((ack)=>{
      console.log(ack);
      setInputValue(ack);
    })
  }

  function clearValue(){
    setInputValue("");
  }

  function inputType(event){
    setInputValue(event.target.value);
  }


  return(<>
    <input value={inputValue} onChange={inputType}></input>
    <button onClick={getValue}>Get</button>
    <button onClick={setValue}>Set</button>
    <button onClick={clearValue}>Clear</button>
  </>);
}

/*


*/
