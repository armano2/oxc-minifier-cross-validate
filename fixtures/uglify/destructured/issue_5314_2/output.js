A = this;
new function() {
    [ {
        [console.log(this === A ? "FAIL" : "PASS")]: [][0],
    } ] = [ 42 ];
}();
