({
    f(a) {
        return a ? console.log("PASS") : super.log("PASS");
    },
}).f(console);
