var a = 123;
(a++ + (b = a))[b] ? 0 ? a : b : 0 ? a : b;
console.log(a, b);
