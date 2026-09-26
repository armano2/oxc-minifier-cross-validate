for (var i = 0; i < 2; i++)
    (function() {
        console.log(e);
        try {
            console;
        } catch (e) {
            var e = "FAIL 1";
        }
        e = "FAIL 2";
        console;
    })();
