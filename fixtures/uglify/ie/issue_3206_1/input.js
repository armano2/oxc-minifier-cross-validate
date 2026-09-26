console.log(function() {
    var foo = function bar() {};
    var baz = function moo() {};
    return "function" == typeof bar;
}());
