function f(a) {
    return a.p || a.p;
}
console.log(f({ p: null }), f({ p: 42 }));
