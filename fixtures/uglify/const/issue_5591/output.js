"use strict";
function f(a) {
    switch (console.log("foo")) {
      case console.log("bar"):
        if (console.log("baz"))
            return;
        else {
            const a = 42;
            return;
        }
      case null:
        FAIL;
    }
}
f();
