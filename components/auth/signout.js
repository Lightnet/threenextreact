/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import useFetch from "../hook/useFetch.mjs";

import {
  useNavigate
} from "react-router-dom";
import { useAuth } from './auth.js';

export function SignOutPage() {
  //const [token, setToken] = useState('');
  const {token, setToken,
    setUser
  } = useAuth();
  const navigate = useNavigate();

  async function clickSignOut(){
    console.log("clickSignOut")
    console.log("login")
    let data = await useFetch('/signout',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body:JSON.stringify({token})
    })
    console.log(data)
    if(data.error){
      console.log('Fetch Error Signout');
      return;
    }
    if(data.action){
      if(data.action=='SIGNOUT'){
        setToken('');
        setUser('');
        navigate('/');
      }
    }
  }

  function clickCancel(){
    console.log("index")
    navigate('/')
  }

  return (<>
    <label>[ Are you sure? ]</label><br />
    <button onClick={clickSignOut}>Logout</button><span> | </span>
    <button onClick={clickCancel}>Cancel</button>
  </>);
}