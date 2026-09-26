A = console;
function f() {
    A = void 0;
}
if ("undefined" == typeof A)
    console.log("FAIL 1");
else {
    f();
    while (console.log(void 0 === A ? "PASS" : "FAIL 2"));
}
