"use strict";
function f(a) {
    switch (console.log("foo")) {
      case console.log("bar"):
        if (console.log("baz"))
            return;
        else {
            let a;
            return;
        }
        break;
      case null:
        FAIL;
    }
}
f();
