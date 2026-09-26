var { 0: a, ...b } = [ "FAIL", "PASS", 42 ];
for (var k in b)
    console.log(k, b[k]);
