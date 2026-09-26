function f() {
    console.log("foo");
}
(function() {
    "use strict";
    class A extends f {
        f() {
            console.log("bar");
        }
    }
    console.log("baz");
    new A().f();
})();
