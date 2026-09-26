var a = 42, b = null, c;
a &&= "foo";
b ||= "bar";
c ??= "baz";
console.log(a, b, c);
