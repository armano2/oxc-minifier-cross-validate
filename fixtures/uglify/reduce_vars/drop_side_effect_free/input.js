var a = 123;
"" + (a && (a.b = 0) || a);
console.log(a);
