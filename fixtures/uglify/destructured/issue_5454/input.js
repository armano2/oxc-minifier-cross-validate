function f(a) {
    var a = 42, a = {
        p: [ a ] = [],
    };
    return "PASS";
}
console.log(f());
