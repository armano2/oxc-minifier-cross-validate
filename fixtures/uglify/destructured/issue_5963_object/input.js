var a = Object.create(null);
({ p: a.PASS } = { p: 42 });
a.FAIL;
for (var p in a)
    console.log(p);
