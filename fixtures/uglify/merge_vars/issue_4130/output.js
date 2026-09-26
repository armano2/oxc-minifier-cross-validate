var a = 2;
while (a)
    try {
        console.log(a);
    } catch (e) {
        var b = 0;
    } finally {
        b && console.log("FAIL");
        var c = --a;
        for (var k in c);
    }
