/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
//import { useBox } from '@react-three/cannon';


const GBox = React.forwardRef((props, ref) => {
//export default function GBox({ref,props}) {
  
  const [hovered, setHover] = useState(false);
  //useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  function clickObject(event){
    //console.log(event);
    console.log("REF: ",ref);
    console.log(props);
  }

  function renderMaterial(){
    if(props.material){
      //need work later for material id for layers....
      return (<>
      {props.material.map((item,index)=>{
        if(item.datatype == 'meshStandardMaterial'){
          return <meshStandardMaterial key={index} wireframe={item.wireframe} color={hovered ? 'hotpink' : item.color} />
        }
      })}
      </>)
      //return <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    }else{
      return <meshStandardMaterial wireframe color={hovered ? 'hotpink' : 'orange'} />
    }
    return <></>
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
      <boxGeometry args={[
        props.parameters.width, 
        props.parameters.height, 
        props.parameters.depth,
        props.parameters.widthSegments,
        props.parameters.heightSegments,
        props.parameters.depthSegments
        ]} />
        {renderMaterial()}
    </mesh>
  )
//}
});
export default GBox;

/*
<lineBasicMaterial wireframe attach="material" color={'#9c88ff'} linewidth={10} linecap={'round'} linejoin={'round'} />
<boxGeometry args={[1, 1, 1]} />
<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
*/