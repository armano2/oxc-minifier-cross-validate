"use strict";
function f() {
    if (console) {
        {
            let a = console.log;
            return void a("PASS");
        }
    }
}
f();
