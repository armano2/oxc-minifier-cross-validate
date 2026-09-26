var A = 1;
console.log(-3);
console.log(A - 5);
(function f1() {
    var a = 2;
    console.log(a - 5);
    eval("console.log(a);");
})();
(function f2(eval) {
    var a = 2;
    console.log(a - 5);
    eval("console.log(a);");
})(eval);
true, "yes";
console.log(A + 1);
