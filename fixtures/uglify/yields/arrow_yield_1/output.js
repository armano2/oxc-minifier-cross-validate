yield="PASS";console.log(function*(){return()=>yield||"FAIL"}().next().value());
