var a = 0;
function f() {
    var b = a;
    a = b;
}
f && f((a++ && a).toString());
console.log(a);
