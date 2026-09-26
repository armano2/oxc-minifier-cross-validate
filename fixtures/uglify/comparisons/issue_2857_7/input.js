function f(a) {
    if ({}.b === undefined || {}.b === null)
        return a.b !== undefined && a.b !== null;
}
console.log(f({ b: [] }));
