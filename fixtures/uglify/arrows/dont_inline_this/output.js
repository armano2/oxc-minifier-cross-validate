var o = {
    p: function() {
        return function() {
            return () => this.q;
        }();
    },
    q: "FAIL",
};
q = "PASS";
console.log(o.p()());
