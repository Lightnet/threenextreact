/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default function renderMaterial(props){
  
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
  }else{//default
    return <meshStandardMaterial wireframe color={hovered ? 'hotpink' : 'orange'} />
  }
}