e = "foo";
for (var i = 0; i < 2; i++)
    (function() {
        console.log(e);
        try {
            console;
        } catch (e) {
            e = "FAIL";
        }
        e = "bar";
        console;
    })();
