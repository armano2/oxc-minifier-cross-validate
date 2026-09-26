var a = "FAIL";
(function* f() {})(a && (a = "PASS"));
console.log(a, typeof f);
