var a = 99, b = 0;
b++,
b = (b += ++a) * a + a,
console.log(a);
