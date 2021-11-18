

//import { useState, useEffect } from 'react';

import useFetch from "../../hook/usefetch";

export default function ProjectDelete({editor,ops}) {

  async function deleteEditorProject(e){
    let data = await useFetch('api/editor',{
      method:'POST',
      body: JSON.stringify({ 
        editorid:editor.id,
        action:'DELETE'
      })
    });
    console.log(data);
    if(data.error){
      console.log('ERROR FETCH DELETE PROJECT')
      return;
    }
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