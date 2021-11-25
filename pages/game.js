/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from 'react';
import { getSession } from "next-auth/react";
import GameMain from '../components/game/gamemain';
import AuthAccess from '../components/system/authaccess';
import { GameProvider } from '../components/game/gameprovider';
import { useRouter } from 'next/router';


export async function getServerSideProps(ctx) {
  return {
    props:{
      session: await getSession(ctx)//,
    }
  }
}

export default function GamePage({session}){

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

  //if(!session){
    //return(<>
      //<label>Loading...</label>
    //</>);  
  //}

  return(<>
    <AuthAccess>
      <GameProvider>
        <GameMain gameid={gameID} sceneid={sceneID} >
        </GameMain>
      </GameProvider>
    </AuthAccess>
  </>);
}
/*

*/
