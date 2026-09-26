console.log(function() {
    "use strict";
    return function() {
        "use strict";
        return this;
    }();
}() ? "FAIL" : "PASS");
