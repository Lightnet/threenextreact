/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState, useEffect, createRef } from 'react';
import useFetch from "../hook/useFetch.mjs";

import {
  useNavigate
} from "react-router-dom";
import { useAuth } from './AuthProvider';

export function SignInPage() {

  const inputRef = createRef(null);

  const [userName, setUserName] = useState('q');
  const [password, setPassword] = useState('q');
  const {setUser,setToken} = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');

  useEffect(()=>{
    inputRef.current.focus()
  },[])
  
  async function clickLogin(){
    //log("login")
    let data = await useFetch('/signin',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body:JSON.stringify({userName, password})
      //, body:JSON.stringify({userName:userName, password:password})
      //, body:{userName:userName, password:password}
    })
    //log(data)
    if(data.error){
      //log('Fetch error Login');
      if(data.error=='PASSWORDFAIL'){
        setStatus('Password Fail!');
      }
      return;
    }
    if(data.action){

      if(data.action=='LOGIN'){
        setUser(data.user);
        setToken(data.token);
        navigate('/')
      }

      if(data.action=='NONEXIST'){
        //navigate('/')
        setStatus('Non Exist!');
      }
    }
  }

  function clickCancel(){
    //log("index")
    navigate('/')
  }

  function typingUser(e){
    setUserName(e.target.value);
  }

  function typingPassword(e){
    setPassword(e.target.value);
  }

  return (<>
    <label>Login:{status}</label>
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label> User: </label>
            </td>
          </tr>

          <tr>
            <td>
              <input ref={inputRef} value={userName} onChange={typingUser}></input>
            </td>
          </tr>

          <tr>
            <td>
              <label> Password: </label>
            </td>
          </tr>

          <tr>
            <td>
              <input value={password} onChange={typingPassword}></input>
            </td>
          </tr>

          <tr>
            <td>
              <button onClick={clickLogin}>Login</button>
              <button onClick={clickCancel}>Cancel</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </>);
}
