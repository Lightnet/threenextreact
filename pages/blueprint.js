/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/39007741/pass-style-array-to-react-component

var style={
  fill:"rgb(0,0,255)",
  "stroke-width":3,
  stroke:"rgb(0,0,0)"
}

export default function Page() {

  function onMouse(){
    console.log("Click")
  }

  return (<>
      <svg width="100%" height="100%">
        <rect width="300" height="100" onMouseDown={onMouse} style={style} />
        Sorry, your browser does not support inline SVG.  
      </svg>
    </>);
}

/*
<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
*/