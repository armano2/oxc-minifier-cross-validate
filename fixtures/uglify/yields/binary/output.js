var a=function*(){console.log(6*(yield"PA"+"SS"))}();console.log(a.next("FAIL").value);console.log(a.next(7).done);
