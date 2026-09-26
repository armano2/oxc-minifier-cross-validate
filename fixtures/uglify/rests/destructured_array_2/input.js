var [ a, ...b ] = [ "FAIL", "PASS", 42 ];
console.log.apply(console, b);
