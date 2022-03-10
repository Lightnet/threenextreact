/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useRef, useState, useEffect } from 'react';
import EntityMaterialParse from '../material/EntityMaterialParse';

export default function EntityPlane(props, ref){

  //const ref = useRef();
  if(!ref){
    ref = useRef();
  }

  const [params, setParams] = useState([])
  const [hovered, setHover] = useState(false)

  useEffect(()=>{
    setParams(Object.keys(props.parameters).reduce((previousValue, idx)=>{
      //console.log(idx)
      //console.log(props.parameters[idx])
      return [...previousValue, props.parameters[idx]]
    } ,[]))
  },[props.parameters])

  function clickObject(event){
    //console.log(event);
    console.log("REF: ",ref);
    console.log(props);
  }

  return (
    <mesh
      ref={ref}
      {...props}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}

      onClick={clickObject}
      //onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <planeGeometry args={params} />
      {props.material && <EntityMaterialParse {...props} />}
    </mesh>
  )
}

export const EntityPlaneRef = React.forwardRef(EntityPlane);