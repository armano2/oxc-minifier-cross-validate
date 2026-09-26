var a = 0;
(a ? 0 : function f() {
    return a = "PASS";
})();
console.log(a);
