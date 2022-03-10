/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";

export default function GamesPage(){

  const [gameList, setGameList] = useState([]);

  useEffect(()=>{
    getGames();
  },[])

  function getGames(){

  }

  function loadGame(e,id){
    e.preventDefault();
    console.log("LOAD GAME",id);
  }

  function removeGame(e,id){
    e.preventDefault();
    console.log("REMOVE GAME",id);
  }

  if(gameList.length == 0){
    return <div>
      <label>No Games listed yet. </label>
    </div>
  }

  return(<>
    <div>
    <label>Game List</label>
    <table>
      <thead>
        <tr>
          <th>
            <label>Name</label>
          </th>
          <th>
            <label>Description</label>
          </th>
          <th>
            <label>Game Modes</label>
          </th>
          <th>
            <label>Actions:</label>
          </th>
        </tr>
      </thead>
      <tbody>
        {gameList.map((item)=>{
          return(
            <tr key={item.id}>
            <th>
              <label>{item.name}</label>
            </th>
            <th>
              <label>{item.description}</label>
            </th>
            <th>
              <label>{item.gamemodes}</label>
            </th>
            <th>
              <a href="#" onClick={(e)=>loadGame(e,item.id)}>Load</a>
              <span>===</span>
              <a href="#" onClick={(e)=>removeGame(e,item.id)}>Remove</a>
            </th>
          </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  </>)
}