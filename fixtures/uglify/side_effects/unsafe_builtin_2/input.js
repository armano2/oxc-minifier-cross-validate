var o = {};
constructor.call(o, 42);
__defineGetter__.call(o, "foo", function() {
    return o.p;
});
__defineSetter__.call(o, void 0, function(a) {
    o.p = a;
});
console.log(typeof o, o.undefined = "PASS", o.foo);
