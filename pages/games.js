/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useEffect, useState } from 'react';
import AuthAccess from '../components/system/authaccess';
import GamesPage from '../components/three/GamesPage';

export default function NextGamesPage(){

  return(<>
    <AuthAccess>
      <GamesPage/>
    </AuthAccess>
  </>);
}