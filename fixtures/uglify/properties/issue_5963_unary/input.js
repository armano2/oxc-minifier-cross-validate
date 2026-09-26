var a = Object.create(null);
a.PASS++;
a.FAIL;
for (var p in a)
    console.log(p);
