var a = 42;
a && [ a = null ] && (a ? console.log("FAIL") : console.log("PASS"));
