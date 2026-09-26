try {
    var a = (b = b.p, "FAIL"), b = b;
} catch (e) {}
console.log(a);
