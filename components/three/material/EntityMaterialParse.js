/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React from "react"

export default function EntityMaterialParse(props){
  
  //console.log(props.material);
  if(props.material){
    //need work later for material id for layers....

    //return <meshStandardMaterial color={'orange'} />
    return (<>
    {props.material.map((item,index)=>{
      if(item.dataType == 'meshStandardMaterial'){
        return <meshStandardMaterial key={index} wireframe={item.wireframe} color={item.color} />
      }
    })}
    </>)
    //return <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
  }else{//default
    return <meshStandardMaterial color={'orange'} />
    return <></>
  }
}