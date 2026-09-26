var x = function f() {
    return f;
};
function g() {
    return x();
}
console.log(g() === g());
