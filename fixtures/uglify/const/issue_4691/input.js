function A() {}
A.prototype.f = function() {
    if (!this)
        return;
    const a = "PA";
    function g(b) {
        h(a + b);
    }
    [ "SS" ].forEach(function(c) {
        g(c);
    });
};
function h(d) {
    console.log(d);
}
new A().f();
