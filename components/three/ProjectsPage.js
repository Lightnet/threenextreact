/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from "react";
import useFetch from "../hook/usefetch.js";
import Modal from "../modal/modal.js"

export default function ProjectsPage(){

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectID, setProjectID] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [projects, setProjects] = useState([]);
  const [dataType, setDataType] = useState(null);

  async function getProejctList(){
    let data = await useFetch("/api/project");
    console.log(data);
    if(data.error){
      console.log("ERROR FETCH PROJECT LIST")
      return;
    }
    //console.log(data);
    if(data.action=='LIST'){
      setEditorProjects(data.editors);
    }
  }

  useEffect(()=>{
    getProejctList();
  },[])

  function typingProjectName(e){setProjectName(e.target.value);}
  function typingProjectDescription(e){setProjectDescription(e.target.value);}
  function closeModal(){setIsOpenModal(false)}

  async function createEditorProject(e){
    let data = await useFetch('api/project',{
      method:'POST',
      body: JSON.stringify({ 
        action:'CREATE',
        name:projectName,
        description:projectDescription
      })
    });
    if(data.error){
      console.log("ERROR FETCH CREATE PROJECT");
      return;
    }
    console.log(data);
    if(data.action=='CREATE'){
      console.log('API CREATE???');
      //console.log(projects)
      //projects.push(data.editor);
      //odd bug not update?
      //setProjects([]);
      //setProjects(projects);
    }
  }

  function renderProjectList(){
    return (<>
      <table>
      <thead>
        <tr>
          <th>
            <label>Name</label>
          </th>
          <th>
            <label>Description</label>
          </th>
          <th>
            <label>Authors</label>
          </th>
          <th>
            <label>Access</label>
          </th>
          <th>
            <label>Game Modes</label>
          </th>
          <th>
            <label>Actions:</label>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* key map error bug */}
        {projects.map((item)=>{
          return(
            <tr key={item.id}>
              <th>
                <label>{item.name}</label>
              </th>
              <th>
                <label>{item.description}</label>
              </th>
              <th>
                <label>{item.authors}</label>
              </th>
              <th>
                <label>{item.access}</label>
              </th>
              <th>
                <label>{item.gamemodes}</label>
              </th>
              <th>
                <a href="#" onClick={(e)=>callBackOPS({action:'edit',id:item.id})}>Edit</a>
                <span> | </span>
                <a href="#" onClick={(e)=>callBackOPS({action:'load',id:item.id})}>Load</a>
                <span> | </span>
                <a href="#" onClick={(e)=>callBackOPS({action:'delete',id:item.id})}>Remove</a>
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

    }else if(dataType == 'edit'){


    }else if(dataType == 'delete'){


    }else if(dataType == 'delete'){


    }else if(dataType == 'updateproject'){
      return <label> Editor Project Update </label>
    }else if(dataType == 'deleteproject'){
      return <label> Editor Project [ID] {editorID} Delete! </label>
    }


  }

  return(<>
    <label> Projects </label>
    <button> Create Project </button>
    {renderProjectList()}

    <Modal 
      isOpen={isOpenModal}
      closeModal={closeModal}
    >
      {
        renderModalMessage()
      }
    </Modal>

  </>)
}