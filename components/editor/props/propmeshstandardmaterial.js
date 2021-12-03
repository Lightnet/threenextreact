/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";
import { useEditor } from "../context/editorprovider";

var colors=[
  'black'
  ,'Navy'
  ,'DarkBlue'
  ,'MediumBlue'
  ,'Blue'
  ,'DarkGreen'
  ,'Green'
  ,'Teal'
  ,'DarkCyan'
  ,'DeepSkyBlue'
  ,'DarkTurquoise'
  ,'MediumSpringGreen'
  ,'Lime'
  ,'SpringGreen'
  ,'Aqua'
  ,'Cyan'
  ,'MidnightBlue'
  ,'DodgerBlue'
  ,'LightSeaGreen'
  ,'ForestGreen'
  ,'SeaGreen'
  ,'DarkSlateGray'
  ,'DarkSlateGrey'
  ,'LimeGreen'
  ,'MediumSeaGreen'
  ,'Turquoise'
  ,'RoyalBlue'
  ,'SteelBlue'
  ,'DarkSlateBlue'
  ,'MediumTurquoise'
  ,'Indigo'
  ,'DarkOliveGreen'
  ,'CadetBlue'
  ,'CornflowerBlue'
  ,'RebeccaPurple'
  ,'MediumAquaMarine'
  ,'DimGray'
  ,'SlateBlue'
  ,'OliveDrab'
  ,'SlateGray'
  ,'SlateGrey'
  ,'LightSlateGray'
  ,'LightSlateGrey'
  ,'MediumSlateBlue'
  ,'LawnGreen'
  ,'Chartreuse'
  ,'Aquamarine'
  ,'Maroon'
  ,'Purple'
  ,'Olive'
  ,'Gray'
  ,'Grey'
  ,'SkyBlue'
  ,'LightSkyBlue'
  ,'BlueViolet'
  ,'DarkRed'
  ,'DarkMagenta'
  ,'SaddleBrown'
  ,'DarkSeaGreen'
  ,'LightGreen'
  ,'MediumPurple'
  ,'DarkViolet'
  ,'PaleGreen'
  ,'DarkOrchid'
  ,'YellowGreen'
  ,'Sienna'
  ,'Brown'
  ,'DarkGray'
  ,'DarkGrey'
  ,'LightBlue'
  ,'GreenYellow'
  ,'PaleTurquoise'
  ,'LightSteelBlue'
  ,'PowderBlue'
  ,'FireBrick'
  ,'DarkGoldenRod'
  ,'MediumOrchid'
  ,'RosyBrown'
  ,'DarkKhaki'
  ,'Silver'
  ,'MediumVioletRed'
  ,'IndianRed'
  ,'Peru'
  ,'Chocolate'
  ,'Tan'
  ,'LightGray'
  ,'LightGrey'
  ,'Thistle'
  ,'Orchid'
  ,'GoldenRod'
  ,'PaleVioletRed'
  ,'Crimson'
  ,'Gainsboro'
  ,'Plum'
  ,'BurlyWood'
  ,'LightCyan'
  ,'Lavender'
  ,'DarkSalmon'
  ,'Violet'
  ,'PaleGoldenRod'
  ,'LightCoral'
  ,'Khaki'
  ,'AliceBlue'
  ,'HoneyDew'
  ,'Azure'
  ,'SandyBrown'
  ,'Wheat'
  ,'Beige'
  ,'WhiteSmoke'
  ,'MintCream'
  ,'GhostWhite'
  ,'Salmon'
  ,'AntiqueWhite'
  ,'Linen'
  ,'LightGoldenRodYellow'
  ,'OldLace'
  ,'Red'
  ,'Fuchsia'
  ,'Magenta'
  ,'DeepPink'
  ,'OrangeRed'
  ,'Tomato'
  ,'HotPink'
  ,'Coral'
  ,'DarkOrange'
  ,'LightSalmon'
  ,'Orange'
  ,'LightPink'
  ,'Pink'
  ,'Gold'
  ,'PeachPuff'
  ,'NavajoWhite'
  ,'Moccasin'
  ,'Bisque'
  ,'MistyRose'
  ,'BlanchedAlmond'
  ,'PapayaWhip'
  ,'LavenderBlush'
  ,'SeaShell'
  ,'Cornsilk'
  ,'LemonChiffon'
  ,'FloralWhite'
  ,'Snow'
  ,'Yellow'
  ,'LightYellow'
  ,'Ivory'
  ,'white'
]

export default function PropMeshStandardMaterial({item,ops}) {
  const {selectObject} = useEditor();
  const [wireframe, setWireFrame] = useState(false);
  const [color, setColor] = useState('gray');
  const [iscolorSelect, setIsColorSelect] = useState(false);

  useEffect(()=>{
    if(item){
      if(item.color){
        setColor(item.color);
      }

      if(item.wireframe){
        setWireFrame(item.wireframe);
      }
    }
  },[item])

  function clickWireframe(e){
    console.log('click: ',e.target.checked);
    let material = item;
    if(material.wireframe==true){
      material.wireframe=false;
      setWireFrame(false);
    }else{
      material.wireframe=true;
      setWireFrame(true);
    }
    ops({
      action:'update',
      id: selectObject.objectid,
      objkey: 'material',
      setValue: material
    });
  }

  function onChangeColor(e){
    setColor(e.target.value)
  }

  function onChangeColorSelect(e){
    setColor(e.target.value)
    let material = item;
    if(material){
      material.color=e.target.value;
      ops({
        action:'update',
        id: selectObject.objectid,
        objkey: 'material',
        setValue: material
      });
    }
  }

  function onKeyChangeColor(e){
    setColor(e.target.value)
    if(e.keyCode==13){
      console.log('color...', e.target.value)

      let material = item;

      material.color=e.target.value;

      ops({
        action:'update',
        id: selectObject.objectid,
        objkey: 'material',
        setValue: material
      });
    }
  }

  function toggleColorSelect(){
    setIsColorSelect(state=>!state);
  }

  return (<div>
    <div>
      <label>Type:{item.datatype} </label>
    </div>
    <div>
      <label>Name:{item.name} </label>
    </div>

    <div>
      <label>color: 
      {iscolorSelect ?(
        <select value={color} onChange={onChangeColorSelect}> 
          {colors.map((item,index)=>{
            return <option key={index} value={item} style={{backgroundColor:item}}>{item} </option>
          })}
          
        </select>
      ):(
      <input 
      style={{width:'92px'}}
      value={color}
      onChange={onChangeColor}
      onKeyUp={onKeyChangeColor} 
      />
      )}
       <button onClick={toggleColorSelect}> Color </button></label>
    </div>

    <div>
      <label>wireframe: 
      <input type="checkbox"
      onChange={clickWireframe} 
      checked={wireframe} /> </label>
    </div>
  </div>);
}