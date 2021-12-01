/*
  LICENSE: MIT
  Created by: Lightnet
*/

export default function PropMeshStandardMaterial({item,ops}) {

  return (<div>
    <div>
      <label>Type:{item.datatype} </label>
    </div>
    <div>
      <label>Name:{item.name} </label>
    </div>

    <div>
      <label>color: <input value={item.color} /> </label>
    </div>

    <div>
      <label>wireframe: <input type='checkbox' checkbox={item.wireframe} /> </label>
    </div>
  </div>);
}