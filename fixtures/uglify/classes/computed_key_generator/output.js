"use strict";
var a = function*() {
    console.log(yield);
}();
a.next("FAIL");
a.next("PASS");
