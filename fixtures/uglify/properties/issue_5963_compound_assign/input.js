var a = Object.create(null);
a.PASS ^= 42;
a.FAIL;
for (var p in a)
    console.log(p);
