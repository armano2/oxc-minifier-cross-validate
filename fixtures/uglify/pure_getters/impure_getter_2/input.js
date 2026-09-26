// will produce incorrect output because getter is not pure
({
    get a() {
        console.log(1);
    },
    b: 1
}).a;
({
    get a() {
        console.log(1);
    },
    b: 1
}).b;
