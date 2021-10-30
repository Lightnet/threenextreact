/**
  Threejs fiber blank template


  
 */

function Foo(props){
  const ref = useRef();
  //console.log("Foo");

  return (
    <mesh
      {...props}
      ref={ref}
      >
    </mesh>
    )
}