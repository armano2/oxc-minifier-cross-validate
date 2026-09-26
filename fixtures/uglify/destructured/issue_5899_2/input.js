var log = console.log, a, b;
a = "foo";
log(a && a);
b = [ a ] = a;
log(a);
