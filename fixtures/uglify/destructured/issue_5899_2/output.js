var log = console.log, a, b;
log((a = "foo") && a);
b = [ a ] = a;
log(a);
