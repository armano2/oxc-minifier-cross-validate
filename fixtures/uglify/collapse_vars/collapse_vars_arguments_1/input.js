var outer = function() {
    // Do not replace `arguments` but do replace the constant `k` before it.
    var k = 7, arguments = 5, inner = function() { console.log(arguments); }
    inner(k, 1);
}
outer();
