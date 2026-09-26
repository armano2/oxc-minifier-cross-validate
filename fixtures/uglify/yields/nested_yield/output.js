console.log(function*(){yield*f();function*f(){return"FAIL"}yield*f();yield*f()}().next().value||"PASS");
