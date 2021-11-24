/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ createContext, useState, useMemo, useContext } from "react";

export const GameContext = createContext();

export function useGame(){
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(`useGame must be used within a UserContext`)
  }
  //console.log(context);
  return context;
}

export function GameProvider(props){
  const [gameID, setGameID] = useState('');
  const [gameName, setGameName] = useState('');
  const [isDebug, setIsDebug] = useState(false);

  const value = useMemo(()=>({
    gameID, setGameID,
    gameName, setGameName,
    isDebug, setIsDebug
  }),[
    gameID,
    gameName,
    isDebug
  ]);

  return <GameContext.Provider value={value} {...props} />
}