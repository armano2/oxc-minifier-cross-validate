var a = 123;
(a++ + (b = a))[b], 0, b;
console.log(a, b);
