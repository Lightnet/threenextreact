/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://gist.github.com/robatron/5681424
// https://stackoverflow.com/questions/13815640/a-proper-wrapper-for-console-log-with-correct-line-number
// https://stackoverflow.com/questions/20524700/custom-console-log-function-a-console-log-wrapper
var ISDEBUG=true;

export function log(...args){
  if(ISDEBUG){
    let e = new Error(args);
    let fullTrace = e.stack.split('\n');
    //console.log(fullTrace);
    for( var i = 0 ; i < fullTrace.length ; ++i ){
      fullTrace[i] = fullTrace[i].replace(/\s+/g, ' ');
    }
    //console.log("fullTrace");
    //console.log(fullTrace);
    let caller = fullTrace[2], // file
                 callerParts = caller.split(':');
    //console.log("caller");
    //console.log(caller);
    if( callerParts.length >= 1 ){
      //console.log('Console log:', callerParts[1],"(Line:", callerParts[2],")"); //note it compile to .next folder
      console.log('Console log:', callerParts[1]);
    }
    console.log(args);
  }
}