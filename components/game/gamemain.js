/*
  LICENSE: MIT
  Created by: Lightnet

  Information:
    This will handle loading and query.

*/

// https://stackoverflow.com/questions/38282997/rendering-an-array-map-in-react/38283182
// https://www.thiscodeworks.com/add-property-to-each-object-in-array-javascript-using-map-code-example-undefined/5faa3e49aa4cd50014938e6e
// https://javascript.info/map-set
// https://stackoverflow.com/questions/48131100/react-render-array-of-components

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGame } from './gameprovider';
import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import useFetch from '../hook/usefetch';
import { buildModel } from '../editor/buildmodel';

export default function GameMain({gameid,sceneid}){
  //console.log(props);

  const [isLoading, setIsLoading] = useState(false); // loading content

  const [sceneID, setSceneID] = useState(null); // loading content
  const [object3Ds, setObject3Ds] = useState([]); // loading content

  const {
    gameID, setGameID,
    isDebug, setIsDebug
  } = useGame();

  useEffect(()=>{
    setIsDebug(true);  
  },[])

  //get game id if exist
  useEffect(()=>{
    if(gameid){
      setGameID(gameid);
    }
  },[gameid])

  useEffect(()=>{
    if(sceneid){
      setSceneID(sceneid);
      getSceneObject3D();
    }
  },[sceneid])

  //async function getGameID(){
  //}

  //function renderDebugAixes(){
  //}

  async function getSceneObject3D(){
    let data = await useFetch('api/',{
      method:'POST',
      body:JSON.stringify({
        action:'OBJECT3DS'
        , sceneid:sceneID
      })
    })
    if(data.error){
      console.log("FETCH ERROR OBJECT3DS")
      msgWarn('Fetch Error Fail GET OBJECT3DS');
      return;
    }
    //console.log("objects: ", data);
    if(data.action){
      if(data.action == 'UPDATE'){
        //api server need fixed?
        setObject3Ds(data.object3ds);
      }
      if(data.action == 'NOOBJECT3DS'){
        console.log("NO object3ds")
      }
    }
  }

  return(<>
    <Canvas>

      {object3Ds.map((_entity)=>{
        return buildModel(_entity)
      })}

      {(isDebug == true )&&
        <GizmoHelper
        alignment="bottom-right" // widget alignment within scene
        margin={[80, 80]} // widget margins (X, Y)
        >
        <GizmoViewport
          axisColors={['red', 'green', 'blue']} labelColor="black"
        ></GizmoViewport>
        </GizmoHelper>}
    </Canvas>
    <div style={{position:'fixed',top:'0px',left:'0px'}}>
      <label>ID:{gameID} </label>
    </div>
    
  </>);
}
/*
  <ambientLight />
  <pointLight position={[10, 10, 10]} />
*/
