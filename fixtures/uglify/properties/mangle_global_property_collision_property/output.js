var a = global;
a.l = "foo";
o = "bar";
global.o = "baz";
console.log(a.l, o);
