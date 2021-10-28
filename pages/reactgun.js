/*
  LICENSE: MIT
  Created by: Lightnet

  gun socket: test for socket current working

  gun rest api: not build, testing by json form or url string
  - size 2MB(2048 characters) chrome limit url
  - 

*/
// https://dabit3.hashnode.dev/how-to-build-a-decentralized-peer-to-peer-network-in-javascript-ckkwl6jnk00ysxps10o94gyzg
// https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request

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
  const [inputAPIValue, setInputAPIValue] = useState("API");
  
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


  async function gunAPIInputType(event){
    setInputAPIValue(event.target.value);
  }
  async function gunAPIGetValue(){
    const getresponse = await fetch('/api/gun');
    console.log(getresponse);
  }
  async function gunAPISetValue(){
    const getresponse = await fetch('/api/gun',{
      method: 'PUT',
      body: JSON.stringify({key:'hello',put:{test:'world!'}})
    });
    console.log(getresponse);
  }
  async function gunAPIClearValue(){
    const getresponse = await fetch('/api/gun',{
      method: 'GET',
      body: JSON.stringify({key:'hello',put:'world!'})
    });
    console.log(getresponse);
  }

  async function gunAPIUrl(){
    //var url = new URL("https://geo.example.org/api"),
    //var url = new URL('http://localhost:3000/api/gun'),//full address needed
    //params = {key:'hello', put:{text:"world"}};
    //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    //url.search = new URLSearchParams(params).toString();
    //const getresponse = await fetch(url).then(/* … */)
    //const getresponse = await fetch(url);
    //console.log(getresponse);

    const getresponse = await fetch('http://localhost:3000/api/gun/' +  new URLSearchParams({
      key:'hello'
      , put: {text:"world"}
    }));
    console.log(getresponse);

  }

  return(<>
    <label>Gun Socket.io</label>
    <input value={inputValue} onChange={inputType}></input>
    <button onClick={setValue}>Set</button>
    <button onClick={getValue}>Get</button>
    <button onClick={clearValue}>Clear</button>
    <br />
    <br />
    <label>REST API</label>
    <br />
    <input value={inputAPIValue} onChange={gunAPIInputType}></input>
    <button onClick={gunAPISetValue}>Set</button>
    <button onClick={gunAPIGetValue}>Get</button>
    <button onClick={gunAPIClearValue}>Clear</button>

    <br />
    <button onClick={gunAPIUrl}>Gun API Url </button>
  </>);
}

/*


*/
