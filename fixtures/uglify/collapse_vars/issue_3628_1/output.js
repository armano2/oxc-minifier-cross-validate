var a = "bar", b;
({
    get p() {
        a = "foo";
    },
    q: b = a
}).p;
console.log(a, b);
