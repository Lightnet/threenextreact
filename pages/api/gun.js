/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://stackoverflow.com/questions/46831742/how-to-use-gun-as-an-express-route
// https://github.com/amark/gun/blob/master/examples/http.js
// https://gun.eco/docs/Installation


//import { Server as ServerIO } from "socket.io";
import GUN from "gun";

export const config = {
  api: {
    bodyParser: false,
  },
};

var gun;

function path(req){
  let ref = gun;
  req.path.split('/').forEach(key => ref = ref.get(key));
  return ref;
}

export default async (req, res) => {
  //console.log(res);
  //console.log(req);
  console.log(req.method);

  if(req.method == 'GET'){
    //path(req).val(data => res.send(data));
  }

  if(req.method == 'PUT'){
    //path(req).put(req.param.put, ack => {
      //res.ack? 0 : res.ack = res.send(ack)
    //})
  }

  if (!res.socket.server.gun) {
    console.log("SETUP GUN");
    console.log(__dirname)
    gun = GUN({
      web:res.socket.server
      //, peers
      , raddisk:false
      //, file:'E:/srctree\threenextreact/data' //dev only
    });

    gun.on('hi', peer => {//peer connect
      //console.log('connect peer to',peer);
      console.log('peer connect!');
    });
    
    gun.on('bye', (peer)=>{// peer disconnect
      //console.log('disconnected from', peer);
      console.log('disconnected from peer!');
    });

    res.socket.server.gun = gun;
  }else{
    console.log("REUSED GUN");
    //gun = global.gun;
    //console.log(gun);
  }

  res.end();
};