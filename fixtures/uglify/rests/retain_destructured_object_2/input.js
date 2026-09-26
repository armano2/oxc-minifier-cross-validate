var { foo: [ a ], ...b } = { foo: [ "FAIL" ], bar: "PASS", baz: 42 };
for (var k in b)
    console.log(k, b[k]);
