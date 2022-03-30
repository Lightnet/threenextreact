/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useEffect, useState } from 'react';
import EntityMaterialParse from '../material/EntityMaterialParse';
import { EditorContext } from '../context/EditorProvider';

export default function EntityTorusKnot(props, ref) {

  //const ref = useRef()
  if(!ref){
    ref = useRef();
  }

  const {
    setSelectObjectUUID,
    setSelectObjectID
  } = React.useContext(EditorContext)

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

  function clickObject(event){
    setSelectObjectUUID(ref.current.uuid);
    setSelectObjectID(props.objectid);
  }

  return (
    <mesh
      {...props}
      ref={ref}
      //scale={active ? 1.5 : 1}
      onClick={clickObject}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <torusKnotGeometry args={params} />
      {props.material && <EntityMaterialParse {...props} />}
    </mesh>
  )
}

export const EntityTorusKnotRef = React.forwardRef(EntityTorusKnot);