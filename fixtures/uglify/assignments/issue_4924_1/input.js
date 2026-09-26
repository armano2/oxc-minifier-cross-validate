var a, b;
console.log("PASS");
a = function() {};
b = function() {}(b ||= a);
