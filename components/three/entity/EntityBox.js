/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useState, useEffect } from 'react';
import EntityMaterialParse from '../material/EntityMaterialParse';

export default function EntityBox(props,ref) {
  // This reference will give us direct access to the THREE.Mesh object
  if(!ref){
    ref = useRef();
  }
  
  const [params, setParams] = useState([])

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

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  function renderCheckMaterial(props){
    if(props.material){
      return <EntityMaterialParse {...props} />
    }
    return <meshStandardMaterial color={'orange'} />
  }

  return (
    <mesh
      {...props}
      ref={ref}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}

      onClick={clickObject}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      >

      <boxGeometry args={params} />
      {hovered ? (
        <meshStandardMaterial color={'hotpink'} />
      ):(
        renderCheckMaterial(props)
      ) }
      
    </mesh>
  )
}

export const EntityBoxRef = React.forwardRef(EntityBox);
/*
{props.material ? (
        <EntityMaterialParse {...props} />
      ):(
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      )}
*/