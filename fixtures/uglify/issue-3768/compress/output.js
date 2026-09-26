console.log(function() {
    var a = 42;
    return eval("typeof a");
}(), (0, eval)("typeof a"), function(eval) {
    var a = false;
    return eval("typeof a");
}(eval), function(f) {
    var a = "STRING";
    var eval = f;
    return eval("typeof a");
}(eval), function(g) {
    var a = eval;
    function eval() {
        return g;
    }
    return eval()("typeof a");
}(eval));
