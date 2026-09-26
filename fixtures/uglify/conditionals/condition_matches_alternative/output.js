function foo(x, y) {
    return x.p && y[0];
}
function bar() {
    return g && h;
}
var g = 4;
var h = 5;
console.log(foo({ p: 3 }, [ null ]), foo({ p: 0 }, [ 7 ]), foo({ p: true } , [ false ]), bar());
