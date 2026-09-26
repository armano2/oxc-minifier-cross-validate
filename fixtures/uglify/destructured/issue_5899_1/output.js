var log = console.log, a, b;
log((a = "foo") && a);
b = { p: a } = a;
log(a);
