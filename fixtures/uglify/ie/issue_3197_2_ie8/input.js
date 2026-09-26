(function(a) {
    var f = function f() {
        console.log(this instanceof f);
    };
    new f(a);
})();
