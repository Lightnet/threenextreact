/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { Server as ServerIO } from "socket.io";
import { log } from "../../lib/log";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (!res.socket.server.io) {
    log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer = res.socket.server;
    
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
    });

    io.on('connection', socket => {
      log("Connect user!");
      socket.broadcast.emit('a user connected')
      socket.on('hello', msg => {
        socket.emit('hello', 'world!')
      })
    })

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  res.end();
};

// https://stackoverflow.com/questions/57512366/how-to-use-socket-io-with-next-js-api-routes
// https://codesandbox.io/s/piffv?file=/src/pages/api/socketio.ts
/*
import { Server } from 'socket.io'
const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    log('*First use, starting socket.io')
    const io = new Server(res.socket.server)
    io.on('connection', socket => {
      socket.broadcast.emit('a user connected')
      socket.on('hello', msg => {
        socket.emit('hello', 'world!')
      })
    })
    res.socket.server.io = io
  } else {
    log('socket.io already running')
  }
  res.end()
}
export const config = {
  api: {
    bodyParser: false
  }
}
export default ioHandler
*/