console.log(function(a) {
    (class {
        static p = a = this;
    });
    return typeof a;
}());
