var o = {};
o.p = 42 < Math.random() ? "FAIL" : "PASS";
for (var k in o)
    console.log(k, o[k]);
