/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useEffect, useState } from 'react';
import EntityMaterialParse from '../material/EntityMaterialParse';

export default function EntityCircle(props, ref) {

  //const ref = useRef()
  if(!ref){
    ref = useRef();
  }

  const [params, setParams] = useState([])
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(()=>{
    setParams(Object.keys(props.parameters).reduce((previousValue, idx)=>{
      console.log(idx)
      console.log(props.parameters[idx])
      return [...previousValue, props.parameters[idx]]
    } ,[]))
  },[props.parameters])

  return (
    <mesh
      {...props}
      ref={ref}
      //scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <circleGeometry args={params} />
      {props.material && <EntityMaterialParse {...props} />}
    </mesh>
  )
}

export const EntityCircleRef = React.forwardRef(EntityCircle);