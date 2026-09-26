var a = "PASS", b;
console,
b = a;
(function() {
    a++;
})(...a);
console.log(b);
