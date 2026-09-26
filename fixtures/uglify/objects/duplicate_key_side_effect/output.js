var o = {
    a: 1,
    b: o = 2,
    a: 3,
};
for (var k in o)
    console.log(k, o[k]);
