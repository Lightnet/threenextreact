/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect } from 'react';
import { getSession } from "next-auth/react";
import GameMain from '../components/game/gamemain';
import AuthAccess from '../components/system/authaccess';

export async function getServerSideProps(ctx) {
  return {
    props:{
      session: await getSession(ctx)//,
    }
  }
}

export default function Game({session}){

  useEffect(()=>{
    console.log(session);
  },[session])

  if(!session){
    return(<>
      <label>Loading...</label>
    </>);  
  }

  return(<>
    <AuthAccess>
      <GameMain>

      </GameMain>
    </AuthAccess>
  </>);
}
/*

*/
