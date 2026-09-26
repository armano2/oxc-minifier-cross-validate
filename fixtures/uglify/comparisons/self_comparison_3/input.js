var a;
function f() {
    var b = a;
    a = null;
    return b;
}
for (var i = 0; i < 2; i++)
    console.log(f() === f());
