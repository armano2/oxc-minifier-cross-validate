function f(a, b) {
    console.log(b);
}
f(A = [] + "" ? 42 : f);
