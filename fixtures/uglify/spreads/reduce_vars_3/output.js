function f() {}
function g() {
    return (a => a)(...[ f ]);
}
console.log(g() === g() ? "PASS" : "FAIL");
