/*
  LICENSE: MIT
  Created by: Lightnet
*/

// bug in key value
// testing array

import { useEffect, useState } from 'react';
import Modal from '../../ui/emodal';
import ProjectDelete from './projectdelete';
import ProjectEdit from './projectedit';
import { useRouter } from 'next/router';
import useFetch from '../../hook/usefetch';

export default function Projects() {

  const router = useRouter();
  const [editorProjects, setEditorProjects] = useState([]);
  const [editorName, setEditorName] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorID, setEditorID] = useState(null);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataType, setDataType] = useState(null);
  
  useEffect(() => { 
    getEditorProject();
  }, []);

  useEffect(()=>{
    //console.log("editorProjects>>>>>>>>>>>>>>");
    //console.log(editorProjects);
  },[editorProjects])

  function onChangeEditorName(e){
    setEditorName(e.target.value);
  }
  function onChangeEditorDescription(e){
    setEditorDescription(e.target.value);
  }

  async function getEditorProject(){
    let data = await useFetch('api/editor');
    if(data.error){
      console.log("ERROR FETCH PROJECT LIST")
      return;
    }
    //console.log(data);
    if(data.action=='LIST'){
      setEditorProjects(data.editors);
    }
  }

  async function createEditorProject(e){
    let data = await useFetch('api/editor',{
      method:'POST',
      body: JSON.stringify({ 
        action:'CREATE',
        name:editorName,
        description:editorDescription
      })
    });
    if(data.error){
      console.log("ERROR FETCH CREATE PROJECT");
      return;
    }
    console.log(data);
    if(data.action=='CREATE'){
      //console.log('API CREATE???');
      //console.log(editorProjects)
      editorProjects.push(data.editor);
      //odd bug not update?
      setEditorProjects([]);
      setEditorProjects(editorProjects);
    }
  }

  function callBackOPS(args){
    if(args){
      if(args.action){
        if(args.action == 'edit'){
          setEditorID(args.id);
          setDataType('edit');
          setIsOpenModal(true);
        }

        if(args.action == 'delete'){
          setEditorID(args.id);
          setDataType('delete');
          setIsOpenModal(true);
        }

        if(args.action == 'update'){
          if(args.datatype=='editor'){
            setEditorID(args.id);
            for(let i=0;i< editorProjects.length;i++){
              if(editorProjects[i].id == args.id){
                editorProjects[i].name = args.name;
                editorProjects[i].description = args.description;
                setEditorProjects(editorProjects);
                break;
              }
            }
            setDataType('updateproject');
            setIsOpenModal(true);
          }
          if(args.datatype=='deleteproject'){
            for(let i=0;i< editorProjects.length;i++){
              if(editorProjects[i].id == args.id){
                //editorProjects[i].name = args.name;
                //editorProjects[i].description = args.description;
                editorProjects.splice(i,1);
                setEditorProjects(editorProjects);
                break;
              }
            }
            setEditorID(args.id);
            setDataType('deleteproject');
            setIsOpenModal(true);
          }
        }

        if(args.action == 'load'){
          router.push('/editor?projectid='+args.id)
        }
        //END ACTION
      }
    }
  }

  function renderEditorOptions(){
    if(dataType == 'edit'){
      let project;
      for(const _project of editorProjects){
        if(_project.id == editorID){
          console.log(_project)
          project = _project;
          break;
        }
      }
      return <ProjectEdit editor={project} ops={callBackOPS}></ProjectEdit>
    }else if(dataType == 'delete'){
      let project;
      for(const _project of editorProjects){
        if(_project.id == editorID){
          console.log(_project)
          project = _project;
          break;
        }
      }
      return <ProjectDelete editor={project} ops={callBackOPS}></ProjectDelete>
    }else if(dataType == 'updateproject'){
      return <label> Editor Project Update </label>
    }else if(dataType == 'deleteproject'){
      return <label> Editor Project [ID] {editorID} Delete! </label>
    }
    return <></>;
  }

  function closeModal(){
    setIsOpenModal(false);
  }

  return (<>
    <label>Editor Projects</label> <button onClick={()=>createEditorProject()}>Create</button>
    
    <input value={editorName} onChange={onChangeEditorName} placeholder="Name"></input>
    <input value={editorDescription} onChange={onChangeEditorDescription} placeholder="Description"></input>

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
        {editorProjects.map((item)=>{
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

    <Modal 
      isOpen={isOpenModal}
      closeModal={closeModal}
    >
      {renderEditorOptions()}
    </Modal>
  </>);
}