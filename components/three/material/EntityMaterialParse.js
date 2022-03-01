/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React from "react"

export default function EntityMaterialParse(props){
  
  if(props.material){
    //need work later for material id for layers....
    return (<>
    {props.material.map((item,index)=>{
      if(item.dataType == 'meshStandardMaterial'){
        return <meshStandardMaterial key={index} wireframe={item.wireframe} color={item.color} />
      }
    })}
    </>)
    //return <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
  }else{//default
    //return <meshStandardMaterial wireframe color={hovered ? 'hotpink' : 'orange'} />
    return <></>
  }
}