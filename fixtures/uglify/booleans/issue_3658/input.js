console.log(function f() {
    console || f();
    return "PASS";
}());
