/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useNotifty } from './NotifyProvider.jsx';

export default function NotiftyPost(){

  const {dispatchNotify} = useNotifty();

  const [colorType, setColorType] = useState('info')
  const [message, setMessage] = useState('')

  const onColorChanged = e => setColorType(e.target.value)
  const onMessageChanged = e => setMessage(e.target.value)

  function clickPostNotify(){
    dispatchNotify({
      type: 'add'
      , color: colorType ||'info'
      //, id: nanoid16()
      , children: message
      //, autoClose: true
    })
  }


  return <>
  <label> Notify React</label><br />
  <label>Type:</label>
        <select value={colorType} onChange={onColorChanged}>
          <option value="info"> info </option>
          <option value="success"> success </option>
          <option value="warning"> warning </option>
          <option value="error"> error </option>
        </select>
        <br />
        <label htmlFor="postContent">Content:</label><br />
        <textarea
          value={message}
          onChange={onMessageChanged}
        /><br />

    
  <button onClick={clickPostNotify}> Notify Post </button>
  <button onClick={clickPostNotify}> Notify Clear </button>
  </>
}