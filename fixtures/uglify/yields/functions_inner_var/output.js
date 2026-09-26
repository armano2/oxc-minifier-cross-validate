function* yield() {
    var a;
    console.log(a, a);
}
yield().next(yield);
