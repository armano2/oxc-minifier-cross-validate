var f = ({ FAIL: a, ...b }) => b, o = f({ PASS: 42, FAIL: null });
for (var k in o)
    console.log(k, o[k]);
