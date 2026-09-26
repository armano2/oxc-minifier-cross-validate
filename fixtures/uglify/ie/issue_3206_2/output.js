console.log(function() {
    (function bar() {});
    return "function" == typeof bar;
}());
