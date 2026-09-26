function f(a, b) {
    (b += a) || (b = a) || (b = b - a ^ a),
    a--;
}
