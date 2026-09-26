var a = "bar", b;
({
    get p() {
        a = "foo";
    },
    q: (b = a, 42)
}).p;
console.log(a, b);
