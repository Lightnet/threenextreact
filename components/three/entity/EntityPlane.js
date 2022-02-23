/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React,{ useRef,useState } from 'react';

export default function EntityPlane(props){

  const ref = useRef();
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

  console.log(props)

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
      <planeGeometry args={[
        props.parameters.width, 
        props.parameters.height, 
        props.parameters.widthSegments,
        props.parameters.heightSegments,
        ]} />
      {
      //renderMaterial()
      }
    </mesh>
  )
}

export const EntityPlaneRef = React.forwardRef((props, ref) => {
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
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}

      onClick={clickObject}
      //onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <planeGeometry args={[
        props.parameters.width, 
        props.parameters.height, 
        props.parameters.widthSegments,
        props.parameters.heightSegments,
        ]} />
      {
      //renderMaterial()
      }
    </mesh>
  )
//}
});

/*
<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
*/