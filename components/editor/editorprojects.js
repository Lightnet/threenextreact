/*
  LICENSE: MIT
  Created by: Lightnet
*/

// bug in key value
// testing array

import { useEffect, useState } from 'react';

export default function Component() {
  const [editorProjects, setEditorProjects] = useState([]);
  const [editorName, setEditorName] = useState("");
  const [editorDescription, setEditorDescription] = useState("");
  const [editorID, setEditorID] = useState(null);
  
  useEffect(() => { 
    getEditorProject();
  }, []);

  function loadGame(e,id){
    e.preventDefault();
    console.log("LOAD GAME",id);
  }

  function removeGame(e,id){
    e.preventDefault();
    console.log("REMOVE GAME",id);
  }

  function onChangeEditorName(e){
    setEditorName(e.target.value);
  }
  function onChangeEditorDescription(e){
    setEditorDescription(e.target.value);
  }

  async function getEditorProject(){
    let res = await fetch('api/editor',{
      method:'POST',
      body: JSON.stringify({ 
        action:'LIST',
        name:editorName,
        description:editorDescription
      })
    });
    let data = await res.json();
    console.log(data);
    if(data.action=='LIST'){
      setEditorProjects(data.editors);
    }
  }

  async function createEditorProject(e){
    let res = await fetch('api/editor',{
      method:'POST',
      body: JSON.stringify({ 
        action:'CREATE',
        name:editorName,
        description:editorDescription
      })
    });
    let data = await res.json();
    console.log(data);
    if(data.action=='CREATE'){
      editorProjects.push(data.editor);
      setEditorProjects(editorProjects);
    }
  }

  return (<>
    <label>Editor Projects</label>
    <button onClick={createEditorProject}>Create</button>
    
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
                <a href="#" onClick={(e)=>loadGame(e,item.id)}>Load</a>
                <span>===</span>
                <a href="#" onClick={(e)=>removeGame(e,item.id)}>Remove</a>
              </th>
            </tr>
            )
        })}
        {/**/}
      </tbody>
    </table>
  </>);
}
