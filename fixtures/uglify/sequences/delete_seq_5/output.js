function f() {}
console.log(delete void f()),
console.log(delete void f()),
console.log(delete (f(), Infinity)),
console.log((f(), delete (1 / 0))),
console.log(delete (f(), NaN)),
console.log((f(), delete (0 / 0)));
