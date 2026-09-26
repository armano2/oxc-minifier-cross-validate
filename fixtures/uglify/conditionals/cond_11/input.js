var o = {
    p: "foo",
    q: function() {
        return this.p;
    }
};
function f() {
    return "bar";
}
function g(a) {
    return a ? f() : o.q();
}
console.log(g(0), g(1));
