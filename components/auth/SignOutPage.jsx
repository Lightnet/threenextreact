/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import useFetch from "../hook/useFetch.mjs";

import {
  useNavigate
} from "react-router-dom";
import { useAuth } from './AuthProvider';

export function SignOutPage() {
  //const [token, setToken] = useState('');
  const {token, setToken,
    setUser
  } = useAuth();
  const navigate = useNavigate();

  async function clickSignOut(){
    //log("clickSignOut")
    //log("login")
    let data = await useFetch('/signout',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body:JSON.stringify({token})
    })
    //log(data)
    if(data.error){
      log('Fetch Error Signout');
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
    log("index")
    navigate('/')
  }

  return (<>
    <label>[ Are you sure? ]</label><br />
    <button onClick={clickSignOut}>Logout</button><span> | </span>
    <button onClick={clickCancel}>Cancel</button>
  </>);
}