var log = console.log, a, b;
a = "foo";
log(a && a);
b = { p: a } = a;
log(a);
