var a;
f();
function f() {
    return ++a + "foo";
}
console.log(a = f());
