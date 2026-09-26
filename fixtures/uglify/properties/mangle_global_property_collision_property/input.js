var a = global;
a.p = "foo";
A = "bar";
global.A = "baz";
console.log(a.p, A);
