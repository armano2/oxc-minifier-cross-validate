(function(a) {
    [ b = console.log("FAIL") ] = [ a ],
    void 0;
    var b;
})(42);
console.log(typeof b);
