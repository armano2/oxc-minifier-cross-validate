var c = 1;
!function f() {
    var o = {
        p: --c && f()
    };
    +o || console.log("PASS");
}();
