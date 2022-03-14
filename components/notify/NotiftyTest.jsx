/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';
import { nanoid16 } from '../../lib/helper.mjs';
import { useNotifty } from './NotifyProvider.jsx';

export function clickInfo0(){// not correct // not react component
  const {dispatchNotify} = useNotifty();

  dispatchNotify({
    type: 'add'
    , children: <label>ASDASD</label>
  })
}

export default function NotiftyTest(){

  const {dispatchNotify} = useNotifty();

  function clickInfo1(){
    dispatchNotify({
      type: 'add'
      , children: <label>ASDASD</label>
    })
  }

  function clickInfo2(){
    dispatchNotify({
      type: 'add'
      , color:'info'
      , id: nanoid16()
      , children: <label>info</label>
      , autoClose: true
    })
  }

  function clickSuccess(){
    dispatchNotify({
      type: 'add'
      , color:'success'
      , id: nanoid16()
      , children: <label>success</label>
      , autoClose: true
    })
  }

  function clickWarning(){
    dispatchNotify({
      type: 'add'
      , color:'warning'
      , id: nanoid16()
      , children: "Warning"
      , autoClose: true
    })
  }

  function clickError(){
    dispatchNotify({
      type: 'add'
      , color:'error'
      , children: <label>Error</label>
    })
  }

  function clickNotifyClear(){
    // clear array []
    dispatchNotify({
      type: 'clear'
    })
  }

  return <>
  <button onClick={clickInfo0}> Notify Info Bad</button>
    <button onClick={clickInfo1}> Notify Info 1</button>
    <button onClick={clickInfo2}> Notify Info 2</button>
    <button onClick={clickSuccess}> Notify Success</button>
    <button onClick={clickWarning}> Notify Warning </button>
    <button onClick={clickError}> Notify Error</button>
    <button onClick={clickNotifyClear}> Notify Clear </button>
  </>
}