/*
  LICENSE: MIT
  Created by: Lightnet
*/

import axios from "axios";
import React, {useState, useEffect} from "react";
import useFetch from "../../hook/useFetch.mjs";
import { useProject } from "../context/ProjectProvider";

export default function AssetsPage(){

  const {projectID} = useProject();

  const [selectFile, setSelectFile] = useState();
  const [isSelectFile, setIsSelectFile] = useState(false);
  const [status, setStatus] = useState("idle");
  const [percent, setPercent] = useState(0);

  const [assets, setAssets] = useState([]);

  useEffect(()=>{
    getAssets();
  },[])

  async function getAssets(){
    let data = await useFetch("/api/assets",{
        method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
        api:'ASSETS',
        projectid:projectID
      })
    })
    if(data.error){
      log("ERROR FETCH GET ASSETS");
      return;
    }
    //log(data);
    if(data.api=="ASSETS"){
      setAssets(data.assets)
    }
  }

  const changeHandler = (event) => {
		setSelectFile(event.target.files[0]);
		setIsSelectFile(true);
    setStatus("Ready!")
	};

  function clickUpload(){
    setPercent(0)
    setStatus("uploading...")
    
    log(selectFile)
    if(!selectFile){
      log("FILE EMPTY!");
      setStatus("Empty File select!")
      return;
    }
    
    const formData = new FormData();
    formData.append('myfiles', selectFile);
    log(projectID)
    formData.append('projectid', projectID);

    const config = {
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        log(percentCompleted)
        setPercent(percentCompleted);
        setStatus(String(percentCompleted)+"%")
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    axios.post("/upload", formData, config)
      .then(res => {
        log(res)
        if(res.statusText=="OK"){
          setStatus("File Uploaded!")
          getAssets();
        }
      })
      .catch(err =>{ 
        log(err)
        setStatus("Error Upload!");
      })
  }

  async function clickDeleteAssetID(id){
    let data = await useFetch("/api/assets",{
        method:'DELETE'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
        api:'DELETE',
        id:id
      })
    })
    if(data.error){
      log("ERROR FETCH GET ASSETS");
      return;
    }
    log(data);
    if(data.api=="DELETE"){
      //setAssets(data.id)
      setAssets(state=>state.filter(item=>item.id != data.id))
    }
  }

  return <>
    <div>
      <div>
        <input type="file" onChange={changeHandler}/> <progress value={percent} max="100" /> <button onClick={clickUpload}> Upload </button>
        <label> {status} </label>
      </div>
      <div>
        <table>
          <tbody>
          {
            assets.map(item=>{
              return <tr key={item.id}>
                <td>
                  {item.id}
                </td>
                <td>
                  {item.filename}
                </td>
                <td>
                  <button onClick={()=>clickDeleteAssetID(item.id)}> Delete </button>
                </td>
              </tr>
            })
          }
        </tbody>
        </table>
        
      </div>
    </div>
  </>
}