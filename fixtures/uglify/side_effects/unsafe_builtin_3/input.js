var o = {};
if (42 < Math.random())
    o.p = "FAIL";
else
    o.p = "PASS";
for (var k in o)
    console.log(k, o[k]);
