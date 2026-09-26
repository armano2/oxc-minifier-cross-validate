var a = 0;
if (a)
    a = 0;
else
    for (var b = 0; --b && ++a < 2;) {
        var o = console, k;
        for (k in o);
    }
console.log(a);
