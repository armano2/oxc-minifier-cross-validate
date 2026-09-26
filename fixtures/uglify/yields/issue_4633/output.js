var a = function*() {
    (function(log) {
        log(typeof this);
    })(yield "PASS");
}();
console.log(a.next().value);
a.next(console.log);
