var a = 100, b = 10;
var c = --a + ("23" - (b++, 1));
console.log(typeof c, a, b, c);
