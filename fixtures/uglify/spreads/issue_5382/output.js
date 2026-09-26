({
    f() {
        ({ ...this });
    },
    get p() {
        console.log("PASS");
    },
}).f();
