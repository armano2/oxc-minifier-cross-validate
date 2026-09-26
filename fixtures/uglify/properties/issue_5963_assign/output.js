var a = Object.create(null);
a.PASS = 42;
for (var p in a)
    console.log(p);
