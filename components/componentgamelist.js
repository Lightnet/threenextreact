/**
 * Blank Component
 */

// bug in key value
// testing array

import { useEffect, useState } from 'react';

export default function Component() {
  const [gameList, setGameList] = useState([]);
  
  useEffect(async () => { 
    let editorlist=[];
    editorlist.push({
      id:"0"
      , name:"test"
      , description:"s"
      , authors:"d"
      , access:"f"
      , gamemodes:"g"
    });

    editorlist.push({
      id:"1"
      , name:"tests"
      , description:"s"
      , authors:"d"
      , access:"f"
      , gamemodes:"g"
    });
    setGameList(editorlist);
  }, []);

  console.log("game list update????????????????????????");

  function loadGame(e,id){
    e.preventDefault();
    console.log("LOAD GAME",id);
  }

  function removeGame(e,id){
    e.preventDefault();
    console.log("REMOVE GAME",id);
  }

  return (<>
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
            <label>Authors</label>
          </th>
          <th>
            <label>Access</label>
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
            <tr>
            <th>
              <label>{item.name}</label>
            </th>
            <th>
              <label>{item.description}</label>
            </th>
            <th>
              <label>{item.authors}</label>
            </th>
            <th>
              <label>{item.access}</label>
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
      
  </>);
}
