var o = {};
o[42] = null;
o.foo = "bar";
for (var k in o)
    console.log(k, o[k]);
