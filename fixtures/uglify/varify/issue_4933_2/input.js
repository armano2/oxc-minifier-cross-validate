console.log(f());
function f() {
    var a;
    for (console in a = [ f ]) {
        const b = a;
    }
}
