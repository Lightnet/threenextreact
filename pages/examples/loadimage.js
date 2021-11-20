/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import useFetch from "../../components/hook/usefetch";

export default function Page() {

  const [objectDatas, setObjectData] = useState([]);
  const [imageData, setImageData]= useState('');

  useEffect(()=>{
    getObjectDatas();
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
    <img src={imageData} alt="Red dot"></img>
    <div>
      ObjectDatas:
    </div>
    <div>
      {objectDatas.map((item)=>{
        return(<div key={item.id}>
          <label> Name:{item.name}.{item.datatype} <button onClick={()=>setImage(item.data)}>Image</button></label>
        </div>);
      })}
    </div>
    </>);
}