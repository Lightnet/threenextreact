/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/46831742/how-to-use-gun-as-an-express-route
// https://github.com/amark/gun/blob/master/examples/http.js
// https://gun.eco/docs/Installation
// https://github.com/QXIP/gun-host
// https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request
//import { Server as ServerIO } from "socket.io";
import GUN from "gun";
import { log } from "../../lib/log";

export const config = {
  api: {
    //bodyParser: false,
  },
};

var gun;

function path(req){
  let ref = gun;
  //req.path.split('/').forEach(key => ref = ref.get(key));
  return ref;
}

export default async (req, res) => {
  //log(res);
  //log(req);
  log("req.method");
  log(req.method);
  log("req.path");
  log(req.path);
  log(req.url);
  log(req.body);

  if(req.method == 'GET'){
    //path(req).val(data => res.send(data));
  }

  if(req.method == 'PUT'){
    
    //path(req).put(req.param.put, ack => {
      //res.ack? 0 : res.ack = res.send(ack)
    //})
  }

  if (!res.socket.server.gun) {
    log("SETUP GUN");
    log(__dirname)
    gun = GUN({
      web:res.socket.server
      //, peers
      , raddisk:false
      //, file:'E:/srctree\threenextreact/data' //dev only
    });

    gun.on('hi', peer => {//peer connect
      //log('connect peer to',peer);
      log('peer connect!');
    });
    
    gun.on('bye', (peer)=>{// peer disconnect
      //log('disconnected from', peer);
      log('disconnected from peer!');
    });

    res.socket.server.gun = gun;
  }else{
    log("REUSED GUN");
    //gun = global.gun;
    //log(gun);
  }

  res.end();
};