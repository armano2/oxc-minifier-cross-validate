function main() {
    var thing = baz();
    if (thing !== (thing = baz()))
        console.log("FAIL");
    else
        console.log("PASS");
}
function baz() {
    return foo, bar;
}
function foo() {}
function bar() {}
main();
