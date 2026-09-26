function nonComputedMember(left, right, context, create) {
    var lhs = left();
    create && 1 !== create && lhs && null == lhs[right] && (lhs[right] = {});
    var value = null != lhs ? lhs[right] : void 0;
    return context ? {
        context: lhs,
        name: right,
        value: value
    } : value;
}
