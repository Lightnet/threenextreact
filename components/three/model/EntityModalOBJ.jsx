/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://docs.pmnd.rs/react-three-fiber/tutorials/loading-models

import React, { Suspense } from "react";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'

export default function EntityModalOBJ(props, ref){

  //const obj = useLoader(OBJLoader, '/box.obj')
  //const obj = useLoader(OBJLoader, props.parameters.url)
  const [meshObj, setMeshObj] = useState(null);
  useEffect(()=>{
    // instantiate a loader
    const loader = new OBJLoader();
    // load a resource
    loader.load(
      // resource URL
      props.parameters.url,
      // called when resource is loaded
      function ( object ) {
        //scene.add( object );
        setMeshObj(object);
      },
      // called when loading is in progresses
      function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      function ( error ) {
        console.log( 'An error happened' );
        setMeshObj(null);
      }
    );
  },[props.parameters.url])

  return <>
    <Suspense fallback={null}>
    {meshObj &&
     <primitive object={meshObj} 
      {...props}
      ref={ref}
      position={[props.position[0],props.position[1],props.position[2]]}
      rotation={[props.rotation[0],props.rotation[1],props.rotation[2]]}
      scale={[props.scale[0],props.scale[1],props.scale[2]]}
     />}
     </Suspense>
  </>
}

export const EntityModalOBJRef = React.forwardRef(EntityModalOBJ);