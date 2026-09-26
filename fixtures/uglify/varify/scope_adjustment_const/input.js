for (var k in [ 42 ])
    console.log(function f() {
        if (k) {
            const a = 0;
        }
    }());
