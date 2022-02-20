

import React,{ useState, useEffect } from 'react';
import useFetch from '../../hook/usefetch';

export default function ProjectEdit({editor,ops}) {

  const [editorName, setEditorName] = useState("");
  const [editorDescription, setEditorDescription] = useState("");

  useEffect(()=>{
    if(editor){
      setEditorName(editor.name)
      setEditorDescription(editor.description)
    }
  },[editor])

  async function updateEditorProject(e){
    let data = await useFetch('api/editor',{
      method:'PATCH',
      body: JSON.stringify({ 
        editorid:editor.id,
        name:editorName,
        description:editorDescription
      })
    });
    //console.log(data);
    if(data.error){
      console.log("ERROR FETCH EDITOR UPDATE")
    }
    if(data.action=='UPDATE'){
      ops({
        action:'update'
        , datatype:'editor'
        , id:data.editor.id
        , name:data.editor.name
        , description:data.editor.description
      })
    }
  }

  function onChangeEditorName(e){
    setEditorName(e.target.value);
  }
  
  function onChangeEditorDescription(e){
    setEditorDescription(e.target.value);
  }

  return (<>
    <div >
      <label>Project Name:</label>
      <input value={editorName} onChange={onChangeEditorName} placeholder="Name"></input>
      <input value={editorDescription} onChange={onChangeEditorDescription} placeholder="Description"></input>
      <button onClick={updateEditorProject}> Update </button>
    </div>
    </>);
  }