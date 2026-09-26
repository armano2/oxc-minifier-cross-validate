var a = 0;
function f() {
    var b;
    a = a;
}
f((a++ && a).toString());
console.log(a);
