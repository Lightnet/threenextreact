/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from 'react';
import AuthAccess from '../components/system/authaccess';
import { useRouter } from 'next/router';
import { EntityProvider } from '../components/three/context/EntityProvider';
import DebugPlay from '../components/three/game/DebugPlay';

export default function GamePage(){

  const router = useRouter();
  const [gameID, setGameID] = useState(null);

  useEffect(()=>{
    const {gameid } = router.query;
    if(gameid){
      //log("project id???", gameid)
      setGameID(gameid);
    }
  },[router])

  return(<>
    <AuthAccess>
      <EntityProvider>
        <DebugPlay gameid={gameID} />
      </EntityProvider>
    </AuthAccess>
  </>);
}