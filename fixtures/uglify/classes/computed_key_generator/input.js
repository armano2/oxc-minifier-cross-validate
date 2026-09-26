"use strict";
var a = function*() {
    class A {
        static [console.log(yield)]() {}
    }
}();
a.next("FAIL");
a.next("PASS");
