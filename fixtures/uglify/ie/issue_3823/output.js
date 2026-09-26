for (var i = 0; i < 1; i++) {
    (function f() {
        f;
    });
    console.log("PASS", typeof f);
}
