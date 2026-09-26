for (var i = 0; i < 1; i++) {
    var a = a ? function f() {
        f;
    } : 0;
    console.log("PASS", typeof f);
}
