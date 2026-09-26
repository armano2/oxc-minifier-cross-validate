var a = 0;
function f(b, c) {
    console.log(b, c);
}
f(++a, a = a, a);
