var a;
(function f1() {
    if (a = function() {})
        console.log(typeof a);
})();
console.log(function f2() {
    return !(a = []);
}());
