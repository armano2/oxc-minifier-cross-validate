var a = f;
function f() {
    return a;
}
console.log(f() === a);
