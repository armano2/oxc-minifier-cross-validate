console.log(function() {
    "use strict";
    return function() {
        "use strict";
        var a = "foo";
        a += "bar";
        return a;
    };
}()());
