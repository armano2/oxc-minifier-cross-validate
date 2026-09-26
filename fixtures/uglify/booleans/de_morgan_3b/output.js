function f(a, b, c) {
    return a || b && c;
}
console.log(f(null, !1), f(null, !1, {}), f(null, !0), f(null, !0, {}));
console.log(f(42, !1), f(42, !1, {}), f(42, !0), f(42, !0, {}));
