(function() {
    function f() {
        while (console.log(typeof g));
    }
    (class {
        static c = f();
    });
})(function g() {});
