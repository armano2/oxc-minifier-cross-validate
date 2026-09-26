Object.setPrototypeOf({
    f(a) {
        a ? this.g("FAIL") : super.g("FAIL");
    },
    g(b) {
        console.log(b);
    },
}, {
    g() {
        console.log("PASS");
    },
}).f();
