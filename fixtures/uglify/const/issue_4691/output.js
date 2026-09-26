function A() {}
A.prototype.f = function() {
    if (this) {
        const a = "PA";
        [ "SS" ].forEach(function(c) {
            g(c);
        });
        function g(b) {
            h(a + b);
        }
    }
};
function h(d) {
    console.log(d);
}
new A().f();
