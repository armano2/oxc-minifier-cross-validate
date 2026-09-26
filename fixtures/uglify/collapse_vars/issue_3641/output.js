var a, b;
try {
    a = "foo";
    b = (a += (A.p = 0, "bar")) % 0;
} catch (e) {}
console.log(a, b);
