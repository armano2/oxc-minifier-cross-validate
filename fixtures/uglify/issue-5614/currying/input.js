function F(arity, fun, wrapper) {
    wrapper.a = arity;
    wrapper.f = fun;
    return wrapper;
}
function F2(fun) {
    return F(2, fun, function(a) {
        return function(b) {
            return fun(a, b);
        };
    });
}
function _Utils_eq(x, y) {
    var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
    while (isEqual && (pair = stack.pop()))
        isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack);
    return isEqual;
}
var _Utils_equal = F2(_Utils_eq);
