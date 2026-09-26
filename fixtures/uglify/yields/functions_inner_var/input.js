var yield = function* a() {
    var a;
    console.log(a, a);
};
yield().next(yield);
