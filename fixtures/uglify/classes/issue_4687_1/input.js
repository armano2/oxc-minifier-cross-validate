"use strict";
new class {
    f() {
        console.log(function(g) {
            return g() === this;
        }(() => this) || "PASS");
    }
}().f();
