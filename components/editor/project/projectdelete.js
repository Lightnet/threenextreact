

//import { useState, useEffect } from 'react';

export default function ProjectDelete({editor,ops}) {

  async function deleteEditorProject(e){
    let res = await fetch('api/editor',{
      method:'POST',
      body: JSON.stringify({ 
        editorid:editor.id,
        action:'DELETE'
      })
    });
    let data = await res.json();
    console.log(data);
    if(data.action=='DELETE'){
      ops({
        action:'update'
        , datatype:'deleteproject'
        , id:data.id
      })
    }
  }

  return (<>
    <div >
      Project Confirm [ID]  {editor?.id} [Name] {editor?.name}  <button onClick={deleteEditorProject}> Delete </button>
    </div>
    </>);
  }