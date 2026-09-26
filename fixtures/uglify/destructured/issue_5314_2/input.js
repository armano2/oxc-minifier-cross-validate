A = this;
new function() {
    (({
        [console.log(this === A ? "FAIL" : "PASS")]: a,
    }) => {})(42);
}();
