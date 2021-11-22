/*
  LICENSE: MIT
  Created by: Lightnet

*/

import { useEffect, useState } from "react";
import useFetch from "../../hook/usefetch";


export default function PropObjectData() {

  const [objectDatas, setObjectData] = useState([]);
  const [imageData, setImageData]= useState('');

  useEffect(()=>{
    getObjectDatas();
    return ()=>{
      console.log("OBJECTDATAS CLEAN UP!");
      setObjectData([])
    }
  },[])

  async function getObjectDatas(){
    let data = await useFetch('http://localhost:3000/api/objectdata');
    if(data.error){
      console.log('Fetch Error ObjectDatas')
    }
    if(data.action=='OBJECTDATAS'){
      setObjectData(data.objectdatas);
    }
  }

  function setImage(data){
    setImageData("data:image/png;base64," + data)
  }

  return (<>
    <div>
      <div>
        <label>ObjectDatas:</label>
      </div>
      <div>
        <img src={imageData} height="64" width="64" />
      </div>
      <div>
        {objectDatas.map((item)=>{
          return(<div key={item.id}>
            <label> Name:{item.name}.{item.datatype} 
            {(item.datatype == 'png' || item.datatype == 'jpg' ) && (<button onClick={()=>setImage(item.data)}>Image</button>)}
            </label>
          </div>);
        })}
      </div>
    </div>
  </>);
}