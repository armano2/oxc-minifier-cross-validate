console.log(function(o) {
    function g(p) {
        return o[p];
    }
    function h(q) {
        while (g(q));
    }
    return h;
}([ 1, "foo", 0 ])(2));
