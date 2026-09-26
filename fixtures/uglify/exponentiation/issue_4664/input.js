function f() {
    new function(a) {
        console.log(typeof f, a, typeof this);
    }((A = 0, (NaN ^ 1) * 2 ** 30), 0);
}
f();
