/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../lib/helper.mjs";
import useFetch from "../hook/usefetch.js";
import Modal from "../modal/modal.js"

export default function ProjectsPage({onLoadEditor}){

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectID, setProjectID] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [projects, setProjects] = useState([]);
  const [dataType, setDataType] = useState(null);
  const navigate = useNavigate();

  async function getProejctList(){
    let data = await useFetch("/api/project");
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH PROJECT LIST")
      return;
    }
    //console.log(data);
    if(data.api=='LIST'){
      setProjects(data.projects);
    }
  }

  useEffect(()=>{
    getProejctList();
  },[])

  function typingProjectName(e){setProjectName(e.target.value);}
  function typingProjectDescription(e){setProjectDescription(e.target.value);}
  function closeModal(){setIsOpenModal(false)}

  async function createProject(e){
    if((isEmpty(projectName))||isEmpty(projectDescription)){
      console.log("Empty fields!");
      return;
    }
    let data = await useFetch('api/project',{
      method:'POST'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
        api:'CREATE',
        name:projectName,
        description:projectDescription
      })
    });
    if(data.error){
      console.log("ERROR FETCH CREATE PROJECT");
      return;
    }
    console.log(data);
    if(data.api=='CREATE'){
      console.log('API created Project!');
      setProjects(state=>[...state,data.project])
      setIsOpenModal(false);
    }
  }

  function clickLoadProjectModel(){
    if(onLoadEditor){
      onLoadEditor({
        target:{
          value:projectID
        }
      })
      return;
    }
    navigate("/editor?projectid="+projectID);
  }

  function clickLoadProject(id){
    if(onLoadEditor){
      onLoadEditor({
        target:{
          value:id
        }
      })
      return;
    }
    navigate("/editor?projectid="+id);
  }

  async function updateProject(e){
    if((isEmpty(projectName))||isEmpty(projectDescription)){
      console.log("Empty fields!");
      return;
    }
    let data = await useFetch('api/project',{
      method:'PUT'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
          api:'UPDATE'
        , id:projectID
        , name:projectName
        , description:projectDescription
      })
    });
    if(data.error){
      console.log("ERROR FETCH CREATE PROJECT");
      return;
    }
    console.log(data);
    if(data.api=='UPDATE'){
      console.log('API created Project!');
      setProjects(projects.map(item=> item.id == data.project.id ? {...item, name:data.project.name,description:data.project.description   }: item ))
      setIsOpenModal(false);
    }
  }

  async function deleteProject(){
    if(isEmpty(projectID)){
      console.log("Empty projectID!");
      return;
    }
    let data = await useFetch('api/project',{
      method:'DELETE'
      , headers: {"Content-Type": "application/json"}
      , body: JSON.stringify({ 
          api:'DELETE'
        , id:projectID
      })
    });
    if(data.error){
      console.log("ERROR FETCH DELETE PROJECT");
      return;
    }
    console.log(data);
    if(data.api=='DELETE'){
      console.log('API created Project!');
      setProjects(projects.filter(item=> item.id != data.projectid ))
      setIsOpenModal(false);
    }
  }

  function clickEditID(id){
    console.log("edit id:",id)
    setProjectID(id)
    setDataType('edit');
    for (let idx in projects){
      console.log(projects[idx]);
      if(projects[idx].id == id){
        setProjectName(projects[idx].name);
        setProjectDescription(projects[idx].description);
        break;
      }
    }
    setIsOpenModal(true);
  }

  function clickLoadID(id){
    setProjectID(id)
    for (let idx in projects){
      console.log(projects[idx]);
      if(projects[idx].id == id){
        setProjectName(projects[idx].name);
        setProjectDescription(projects[idx].description);
        break;
      }
    }
    setDataType('load');
    setIsOpenModal(true);
  }

  function clickDeleteID(id){
    setProjectID(id)
    for (let idx in projects){
      console.log(projects[idx]);
      if(projects[idx].id == id){
        setProjectName(projects[idx].name);
        setProjectDescription(projects[idx].description);
        break;
      }
    }
    setDataType('delete');
    setIsOpenModal(true);
  }

  function renderProjectList(){
    return (<>
      <table>
      <thead>
        <tr>
        <th>
            <label>[ ID ]</label>
          </th>
          <th>
            <label>[ Name ]</label>
          </th>
          <th>
            <label>[ Description ]</label>
          </th>
          <th>
            <label>[ Actions: ]</label>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* key map error bug */}
        {projects.map((item)=>{
          return(
            <tr key={item.id}>
              <th>
                <label>{item.id}</label>
              </th>
              <th>
                <label>{item.name}</label>
              </th>
              <th>
                <label>{item.description}</label>
              </th>
              <th>
                <button onClick={(e)=>clickEditID(item.id)}>Edit</button>
                <span> | </span>
                <button onClick={(e)=>clickLoadID(item.id)}>Load</button>
                <span> | </span>
                <button onClick={(e)=>clickLoadProject(item.id)}>Load 2</button>
                <span> | </span>
                <button onClick={(e)=>clickDeleteID(item.id)}>Remove</button>
              </th>
            </tr>
            )
        })}
        {/**/}
      </tbody>
    </table>
    </>)
  }

  function renderModalMessage(){
    if(dataType == 'create'){
      return <>
        <label> Name: </label><br/>
        <input value={projectName} onChange={typingProjectName}/><br/>
        <label> Description: </label><br/>
        <input value={projectDescription} onChange={typingProjectDescription}/><br/><br/>
        <button onClick={createProject}> Create Project </button>
      </>
    }else if(dataType == 'edit'){
      return <>
        <label> ID: </label><br/>
        <label> {projectID} </label><br/>
        <label> Name: </label><br/>
        <input value={projectName} onChange={typingProjectName}/><br/>
        <label> Description: </label><br/>
        <input value={projectDescription} onChange={typingProjectDescription}/><br/><br/>
        <button onClick={updateProject}> Update Project </button>
      </>
    }else if(dataType == 'load'){
      return <>
        <label> ID: </label><br/>
        <label> {projectID} </label><br/>
        <label> Name: </label><br/>
        <label> {projectName} </label> <br/>
        <label> Description: </label><br/>
        <label>{projectDescription}</label> <br/><br/>
        <button onClick={clickLoadProjectModel}> Load Project? </button>
      </>
    }else if(dataType == 'delete'){
      return <>
        <label> ID: </label><br/>
        <label> {projectID} </label><br/>
        <label> Name: </label><br/>
        <label> {projectName} </label> <br/>
        <label> Description: </label><br/>
        <label>{projectDescription}</label> <br/><br/>
        <button onClick={deleteProject}> Delete Project? </button>
      </>
    }else if(dataType == 'updateproject'){
      return <label> Editor Project Update </label>
    }else if(dataType == 'deleteproject'){
      return <label> Editor Project [ID] {editorID} Delete! </label>
    }else{
      return <label> loading... </label>
    }
  }

  function clickCreateProject(){
    setIsOpenModal(true);
    setDataType('create');
  }

  return(<>
    <label> Projects </label>
    <button onClick={clickCreateProject}> Create Project </button>
    {renderProjectList()}

    <Modal 
      isOpen={isOpenModal}
      closeWindow={closeModal}
      pwidth={300}
    >
      {
        renderModalMessage()
      }
    </Modal>

  </>)
}