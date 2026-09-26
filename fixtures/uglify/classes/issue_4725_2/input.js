"use strict";
new class {
    f() {
        return function() {
            while (console.log("PASS"));
        }();
    }
}().f();
