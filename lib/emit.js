/*

  event emiiter
// https://medium.com/@krzakmarek88/eventemitter-instead-of-lifting-state-up-f5f105054a5
*/
import EventEmitter from 'eventemitter3';

var EE;

if(!EE){
  console.log("INIT EventEmitter");
  EE = new EventEmitter();
}else{
  console.log("REUSE EventEmitter");
}

exports.EE=EE;
/*
var EE = new EventEmitter()
  , context = { foo: 'bar' };
 
function emitted() {
  console.log(this === context); // true
}
 
EE.once('event-name', emitted, context);
EE.on('another-event', emitted, context);
EE.removeListener('another-event', emitted, context);
*/