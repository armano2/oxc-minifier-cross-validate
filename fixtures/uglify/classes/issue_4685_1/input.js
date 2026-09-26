"use strict";
new class {
    f() {
        (function(g) {
            if (g() !== this)
                console.log("PASS");
        })(() => this);
    }
}().f();
