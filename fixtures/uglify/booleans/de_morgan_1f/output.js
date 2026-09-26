function f(a, b) {
    return a.p + b.q;
}
console.log(f({ p: null }, { q: !1 }));
console.log(f({ p: "foo" }, { q: 42 }));
