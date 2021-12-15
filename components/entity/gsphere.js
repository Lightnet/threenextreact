/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef, useEffect, useState } from 'react';
//import { Canvas, useFrame, useThree, render, events } from '@react-three/fiber';
//import { PerspectiveCamera, OrbitControls, PositionalAudio } from '@react-three/drei'
//import { usePlane } from '@react-three/cannon';

const GSphere = React.forwardRef((props, ref) => {

  const [hovered, setHover] = useState(false)

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
      return <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      //return <meshStandardMaterial wireframe color={hovered ? 'hotpink' : 'orange'} />
    }
    return <></>
  }

  return (
    <mesh
      ref={ref}
      {...props}
      //scale={active ? 1.5 : 1}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}

      onClick={clickObject}
      //onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <sphereGeometry args={[ //1, 16, 16
        props.parameters.radius, 
        props.parameters.widthSegments, 
        props.parameters.heightSegments, 
        props.parameters.phiStart, 
        props.parameters.phiLength, 
        props.parameters.thetaStart, 
        props.parameters.thetaLength,
      ]} />
      {renderMaterial()}
    </mesh>
  )
//}
});
export default GSphere;
/*

<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
*/