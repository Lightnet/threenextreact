/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import useFetch from "../hook/useFetch.mjs";

import {
  useNavigate
} from "react-router-dom";

export function SignUpPage() {

  const [status, setStatus] = useState('');

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function clickRegister(){
    let data = await useFetch('/signup',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body:JSON.stringify({user,password})
    })
    console.log(data)
    if(data.error){
      console.log('Fetch error Sign Up');
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
    console.log("index")
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
              <label> User: </label>
            </td>
          </tr>

          <tr>
            <td>
              <input value={user} onChange={typingUser}></input>
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