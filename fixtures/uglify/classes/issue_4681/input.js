console.log(function(a) {
    class A {
        static p = a = this;
    }
    return typeof a;
}());
