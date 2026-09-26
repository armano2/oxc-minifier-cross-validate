function nonComputedMember(left, right, context, create) {
    var lhs = left();
    if (create && create !== 1) {
        if (lhs && lhs[right] == null) {
            lhs[right] = {};
        }
    }
    var value = lhs != null ? lhs[right] : undefined;
    if (context) {
        return { context: lhs, name: right, value: value };
    } else {
        return value;
    }
}
