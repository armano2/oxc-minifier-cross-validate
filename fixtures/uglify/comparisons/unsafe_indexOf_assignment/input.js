var a;
if ((a = Object.keys({ foo: 42 }).indexOf("bar")) < 0) console.log("PASS");
if (0 > (a = Object.keys({ foo: 42 }).indexOf("bar"))) console.log("PASS");
