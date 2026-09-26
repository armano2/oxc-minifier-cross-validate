var { foo: {}, ...b } = { foo: 0, bar: "PASS", baz: 42 };
for (var k in b)
    console.log(k, b[k]);
