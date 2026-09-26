var a = "foo";
f();
a = "bar";
f();
async function f() {
    console.log(a);
}
