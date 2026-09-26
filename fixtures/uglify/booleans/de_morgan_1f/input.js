function f(a, b) {
    return a.p + b.q;
}
console.log(f({ p: null }, { q: false }) || f({ p: null }, { q: false }));
console.log(f({ p: "foo" }, { q: 42 }) && f({ p: "foo" }, { q: 42 }));
