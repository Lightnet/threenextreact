/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext, useEffect } from "react";
import useFetch from "../hook/useFetch.mjs";
import { isEmpty } from "../../lib/helper.mjs";

export const AuthContext = createContext();

export function useAuth(){
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthContext`)
  }
  return context;
}

export function AuthProvider(props){
  const [token, setToken] = useState(''); // required access
  const [userID, setUserID] = useState(''); // use?
  const [user, setUser] = useState(''); // user name
  const [session, setSession] = useState(''); // use?
  const [status, setStatus] = useState('unauth'); //loading, auth, unauth

  //safe?
  useEffect(async()=>{
    setStatus('loading')
    console.log("testing....")
    let data = await useFetch('/session');
    if(data.error){
      console.log('Fetch Error Session!');
      setStatus('unauth')
      return;
    }

    if(data.token){
      console.log("data",data)
      setToken(data.token);
      setUser(data.user);
      setStatus('auth');
    }else{
      setStatus('unauth')
    }
  },[])

  useEffect(()=>{
    if(!isEmpty(token)){
      //console.log("TOKEN")
      setStatus('auth')
    }else{
      setStatus('unauth')
    }
  },[token])

  const value = useMemo(()=>({
    token, setToken,
    userID, setUserID,
    user, setUser,
    session, setSession,
    status, setStatus
  }),[
    token,
    userID,
    user,
    session,
    status
  ])

  return <AuthContext.Provider value={value} {...props} />
}