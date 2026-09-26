function f0(o, a, h) {
    return o.run(3 - a)[7] = h;
}
function f1(x) { return 5 - x }
function f2(x) { return foo() / (5 - x) }
function f3(x) { return (5 - x) / foo() }
function f4(x) { var z = foo(); return (5 - u) / z }
function f5(x) { var z = foo(); return (5 - window.x) / z }
function f6() { return window.a * window.z && zap() }
function f7() { var b = window.a * window.z; return b + b }
function f8() { var b = window.a * window.z; return b + (5 + b) }
function f9() { var b = window.a * window.z; return bar() || b }
function f10(x) { return 8; }
function f11(x) { return 7; }
