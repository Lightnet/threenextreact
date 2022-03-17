/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { EntityProvider } from "./context/EntityProvider";
import DebugPlay from "./game/DebugPlay";
import {
  useSearchParams
} from "react-router-dom";
import { isEmpty } from "../../lib/helper.mjs";
import { EditorProvider } from "./context/EditorProvider";

export default function GamePage({gameid}){

  const [projectID, setProjectID] = useState("");
  const [searchParams] = useSearchParams();
  //check props var
  useEffect(()=>{
    //console.log(projectid);
    if(!isEmpty(gameid)){
      setProjectID(gameid)
    }else{
      console.log("props.gameid NULL!")
    }
  },[gameid])
  //check url oaram var 
  useEffect(()=>{
    const currentParams = Object.fromEntries([...searchParams]);
    //console.log(currentParams);
    if(currentParams?.gameid){
      setProjectID(currentParams.gameid)
    }
  },[searchParams])

  return(<>
    <EditorProvider>
      <EntityProvider>
        <DebugPlay gameid={projectID}/>
      </EntityProvider>
    </EditorProvider>
  </>)
}