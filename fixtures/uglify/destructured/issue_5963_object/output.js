var a = Object.create(null);
({ p: a.PASS } = { p: 42 });
for (var p in a)
    console.log(p);
