/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState, useEffect, createRef } from 'react';
import useFetch from "../hook/useFetch.mjs";

import {
  useNavigate
} from "react-router-dom";
import { log } from '../../lib/log.mjs';

export function SignUpPage() {

  const inputRef = createRef(null);
  const [status, setStatus] = useState('');

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    inputRef.current.focus()
  },[])

  async function clickRegister(){
    let data = await useFetch('/signup',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body:JSON.stringify({user,password})
    })
    //log(data)
    if(data.error){
      log('Fetch error Sign Up');
      return;
    }
    if(data.action){
      if(data.action=='CREATE'){
        //navigate('/');
        setStatus('CREATE')
      }
      if(data.action=='EXIST'){
        setStatus('EXIST')
      }
    }
  }

  function clickCancel(){
    //log("index")
    navigate('/')
  }

  function typingUser(e){
    setUser(e.target.value);
  }

  function typingPassword(e){
    setPassword(e.target.value);
  }

  return (<>
    <div>
      <label>Register:{status}</label>
    </div>
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label> User Name: </label>
            </td>
          </tr>

          <tr>
            <td>
              <input ref={inputRef} value={user} onChange={typingUser}></input>
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
              <button onClick={clickRegister}>Submit</button>
              <button onClick={clickCancel}>Cancel</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </>);
}