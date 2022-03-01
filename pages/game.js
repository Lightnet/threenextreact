/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';
import AuthAccess from '../components/system/authaccess';
import { useRouter } from 'next/router';
import { EntityProvider } from '../components/three/context/EntityProvider';
import DebugPlay from '../components/three/game/DebugPlay';

export default function GamePage(){

  const router = useRouter();
  const [gameID, setGameID] = useState(null);
  const [sceneID, setSceneID] = useState(null);

  useEffect(()=>{
    const {gameid,sceneid } = router.query;
    if(gameid){
      //console.log("assign project id???")
      setGameID(projectid);
    }
    if(sceneid){
      //console.log("assign project id???")
      setSceneID(sceneid);
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