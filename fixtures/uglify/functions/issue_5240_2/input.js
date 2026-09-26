function f() {
    try {
        throw "FAIL 1";
    } catch (e) {
        {
            return function() {
                if (console) {
                    console.log(e);
                    var e = "FAIL 2";
                }
            }();
        }
    }
}
f();
