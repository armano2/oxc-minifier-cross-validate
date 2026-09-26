"use strict";
new class {
    f() {
        console.log(function(g) {
            return g() === this;
        }(() => {
            if (console)
                return this;
        }) || "PASS");
    }
}().f();
